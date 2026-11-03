const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-only-secret-that-is-not-used-outside-tests";
process.env.FRONTEND_ORIGIN = "http://localhost:5173";

const { app } = require("../index");
const Customer = require("../models/Customers");
const Representative = require("../models/Representatives");
const Category = require("../models/Category");
const Dish = require("../models/Dish");

let server;
let baseUrl;

test.before(() => {
  server = app.listen(0);
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => new Promise((resolve) => server.close(resolve)));

test("passwords are excluded from account queries by default", () => {
  assert.equal(Customer.schema.path("password").options.select, false);
  assert.equal(Representative.schema.path("password").options.select, false);
});

test("private data and writes require authentication", async () => {
  for (const [path, method] of [
    ["/getAllReservations", "GET"],
    ["/getAllCustomers", "GET"],
    ["/createDish", "POST"],
    ["/upload", "POST"],
  ]) {
    const response = await fetch(`${baseUrl}${path}`, { method });
    assert.equal(response.status, 401, `${method} ${path}`);
    assert.deepEqual(await response.json(), { message: "Authentication required" });
  }
});

test("signed roles and account ids are enforced before database access", async () => {
  const customerToken = jwt.sign(
    { sub: "507f1f77bcf86cd799439011", role: "customer" },
    process.env.JWT_SECRET,
  );
  const representativeToken = jwt.sign(
    { sub: "507f1f77bcf86cd799439012", role: "representative" },
    process.env.JWT_SECRET,
  );
  const forbiddenWrite = await fetch(`${baseUrl}/createDish`, {
    method: "POST",
    headers: { Authorization: `Bearer ${customerToken}` },
  });
  assert.equal(forbiddenWrite.status, 403);

  const stolenAccountId = await fetch(
    `${baseUrl}/getAllReservationsByRepId/507f1f77bcf86cd799439013`,
    { headers: { Authorization: `Bearer ${representativeToken}` } },
  );
  assert.equal(stolenAccountId.status, 403);
});

test("JWT verification rejects non-HS256 algorithms and invalid claims", async () => {
  const tokens = [
    jwt.sign(
      { sub: "507f1f77bcf86cd799439011", role: "customer" },
      process.env.JWT_SECRET,
      { algorithm: "HS384" },
    ),
    jwt.sign({ sub: "not-an-object-id", role: "customer" }, process.env.JWT_SECRET),
    jwt.sign(
      { sub: "507f1f77bcf86cd799439011", role: "administrator" },
      process.env.JWT_SECRET,
    ),
  ];

  for (const token of tokens) {
    const response = await fetch(`${baseUrl}/getAllReservations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(response.status, 401);
    assert.deepEqual(await response.json(), { message: "Invalid or expired session" });
  }
});

test("dish creation and updates reject categories outside the authenticated restaurant", async () => {
  const representativeId = "507f1f77bcf86cd799439012";
  const token = jwt.sign({ sub: representativeId, role: "representative" }, process.env.JWT_SECRET);
  const originalExists = Category.exists;
  Category.exists = async () => null;
  try {
    const response = await fetch(`${baseUrl}/createDish`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        dish_name: "Test dish",
        description: "Test description",
        category: "507f1f77bcf86cd799439099",
        price: 10,
      }),
    });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { message: "Category must belong to your restaurant" });

    const updateResponse = await fetch(`${baseUrl}/updateDish/507f1f77bcf86cd799439088`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ category: "507f1f77bcf86cd799439099" }),
    });
    assert.equal(updateResponse.status, 400);
    assert.deepEqual(await updateResponse.json(), { message: "Category must belong to your restaurant" });
  } finally {
    Category.exists = originalExists;
  }
});

test("valid restaurant-owned categories preserve dish create and update workflows", async () => {
  const representativeId = "507f1f77bcf86cd799439012";
  const categoryId = "507f1f77bcf86cd799439099";
  const dishId = "507f1f77bcf86cd799439088";
  const token = jwt.sign({ sub: representativeId, role: "representative" }, process.env.JWT_SECRET);
  const originalCategoryExists = Category.exists;
  const originalDishCreate = Dish.create;
  const originalDishUpdate = Dish.findOneAndUpdate;
  const categoryQueries = [];
  let updateFilter;

  Category.exists = async (query) => { categoryQueries.push(query); return { _id: categoryId }; };
  Dish.create = async (values) => ({ _id: dishId, ...values });
  Dish.findOneAndUpdate = async (filter, update) => {
    updateFilter = filter;
    return { _id: dishId, ...update.$set, rep_id: representativeId };
  };

  try {
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const createResponse = await fetch(`${baseUrl}/createDish`, {
      method: "POST",
      headers,
      body: JSON.stringify({ dish_name: "Test dish", description: "Created", category: categoryId, price: 10 }),
    });
    assert.equal(createResponse.status, 201);
    assert.equal((await createResponse.json()).rep_id, representativeId);

    const updateResponse = await fetch(`${baseUrl}/updateDish/${dishId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ category: categoryId, description: "Updated" }),
    });
    assert.equal(updateResponse.status, 200);
    assert.deepEqual(updateFilter, { _id: dishId, rep_id: representativeId });
    assert.deepEqual(categoryQueries, [
      { _id: categoryId, rep_id: representativeId },
      { _id: categoryId, rep_id: representativeId },
    ]);
  } finally {
    Category.exists = originalCategoryExists;
    Dish.create = originalDishCreate;
    Dish.findOneAndUpdate = originalDishUpdate;
  }
});

test("upload rejects content that only claims to be an image", async () => {
  const representativeToken = jwt.sign(
    { sub: "507f1f77bcf86cd799439012", role: "representative" },
    process.env.JWT_SECRET,
  );
  const data = new FormData();
  data.append("image", new Blob(["not really a png"], { type: "image/png" }), "fake.png");
  const response = await fetch(`${baseUrl}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${representativeToken}` },
    body: data,
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: "The uploaded file content is not a valid supported image",
  });
});

test("health check reports a disconnected database without leaking details", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "database unavailable" });
});

test("CORS rejects unconfigured browser origins", async () => {
  const response = await fetch(`${baseUrl}/health`, { headers: { Origin: "https://attacker.example" } });
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { message: "Origin is not allowed by CORS" });
});
