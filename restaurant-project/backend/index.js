require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { v2: cloudinary } = require("cloudinary");
const path = require("path");

const Customer = require("./models/Customers");
const Representative = require("./models/Representatives");
const Dish = require("./models/Dish");
const Category = require("./models/Category");
const Promotion = require("./models/Promotion");
const Reservation = require("./models/Reservation");

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",").map((value) => value.trim().replace(/\/$/, "")).filter(Boolean);

app.disable("x-powered-by");
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin(origin, done) {
  if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) return done(null, true);
  return done(new Error("Origin is not allowed by CORS"));
} }));
app.use(express.json({ limit: "100kb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const asyncRoute = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const isId = (value) => mongoose.isValidObjectId(value);
const emailOf = (value) => String(value || "").trim().toLowerCase();
const missing = (body, fields) => fields.filter((field) => body[field] === undefined || body[field] === null || String(body[field]).trim() === "");

function signToken(account, role) {
  return jwt.sign({ sub: account._id.toString(), role }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "8h" });
}

function authenticate(req, res, next) {
  const [scheme, token] = (req.get("authorization") || "").split(" ");
  if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Authentication required" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    const validRole = decoded && typeof decoded === "object" && ["customer", "representative"].includes(decoded.role);
    if (!validRole || !isId(decoded.sub)) throw new Error("Invalid token claims");
    req.auth = decoded;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid or expired session" });
  }
}

const requireRole = (role) => [authenticate, (req, res, next) => {
  if (req.auth.role !== role) return res.status(403).json({ message: "You do not have permission for this action" });
  next();
}];

async function login(Model, role, req, res) {
  const email = emailOf(req.body.email);
  const password = String(req.body.password || "");
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
  const account = await Model.findOne({ email }).select("+password");
  if (!account) return res.status(401).json({ message: "Invalid email or password" });
  const stored = account.password || "";
  const isHash = /^\$2[aby]\$/.test(stored);
  const valid = isHash ? await bcrypt.compare(password, stored) : stored === password;
  if (!valid) return res.status(401).json({ message: "Invalid email or password" });
  // Upgrade a legacy plaintext record only after its owner authenticates successfully.
  if (!isHash) {
    account.password = await bcrypt.hash(password, 12);
    await account.save();
  }
  res.json({ message: "Logged in successfully", id: account._id, role, token: signToken(account, role) });
}

async function register(Model, role, fields, req, res) {
  const absent = missing(req.body, [...fields, "email", "password"]);
  if (absent.length) return res.status(400).json({ message: `Missing required fields: ${absent.join(", ")}` });
  const email = emailOf(req.body.email);
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address" });
  if (String(req.body.password).length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
  if (await Model.exists({ email })) return res.status(409).json({ message: "An account with that email already exists" });
  const values = Object.fromEntries(fields.map((field) => [field, String(req.body[field]).trim()]));
  const account = await Model.create({ ...values, email, password: await bcrypt.hash(String(req.body.password), 12) });
  res.status(201).json({ message: "Account created", id: account._id, role });
}

app.get("/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? "ok" : "database unavailable" });
});

// Public restaurant and menu data never includes account credentials.
app.get("/getAllRepresentatives", asyncRoute(async (_req, res) => res.json(
  await Representative.find({}).select("restaurant_name restaurant_image address"),
)));
app.get("/getRepresentative/:id", asyncRoute(async (req, res) => {
  if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid restaurant id" });
  const record = await Representative.findById(req.params.id).select("restaurant_name restaurant_image address");
  if (!record) return res.status(404).json({ message: "Restaurant not found" });
  res.json(record);
}));

const publicResources = [
  ["Dish", Dish, "/getDish/:id", "/getAllDishes", "/getAllDishesByRepId/:rep_id"],
  ["Category", Category, "/getCategory/:id", "/getAllCategories", "/getAllCategoriesByRepId/:rep_id"],
  ["Promotion", Promotion, "/getPromotion/:id", "/getAllPromotions", "/getAllPromotionsByRepId/:rep_id"],
];
for (const [label, Model, onePath, allPath, byRepPath] of publicResources) {
  app.get(onePath, asyncRoute(async (req, res) => {
    if (!isId(req.params.id)) return res.status(400).json({ message: `Invalid ${label.toLowerCase()} id` });
    const record = await Model.findById(req.params.id);
    if (!record) return res.status(404).json({ message: `${label} not found` });
    res.json(record);
  }));
  app.get(allPath, asyncRoute(async (_req, res) => res.json(await Model.find({}))));
  app.get(byRepPath, asyncRoute(async (req, res) => {
    if (!isId(req.params.rep_id)) return res.status(400).json({ message: "Invalid restaurant id" });
    res.json(await Model.find({ rep_id: req.params.rep_id }));
  }));
}
app.get("/getAllDishesByRepIdAndCategoryId/:rep_id/:category", asyncRoute(async (req, res) => {
  if (!isId(req.params.rep_id) || !isId(req.params.category)) return res.status(400).json({ message: "Invalid restaurant or category id" });
  res.json(await Dish.find({ rep_id: req.params.rep_id, category: req.params.category }));
}));
app.get("/getAllCategoriesByRepIdAndCategoryId/:rep_id/:category_id", asyncRoute(async (req, res) => {
  if (!isId(req.params.rep_id) || !isId(req.params.category_id)) return res.status(400).json({ message: "Invalid restaurant or category id" });
  res.json(await Category.find({ rep_id: req.params.rep_id, _id: req.params.category_id }));
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: "Too many sign-in attempts. Please try again later" },
});
app.post("/loginRepresentative", loginLimiter, asyncRoute((req, res) => login(Representative, "representative", req, res)));
app.post("/loginCustomer", loginLimiter, asyncRoute((req, res) => login(Customer, "customer", req, res)));
app.post("/createCustomer", asyncRoute((req, res) => register(Customer, "customer", ["first_name", "surname"], req, res)));
app.post("/createRep", asyncRoute((req, res) => register(Representative, "representative", ["restaurant_name", "address"], req, res)));

app.get("/me", authenticate, asyncRoute(async (req, res) => {
  const Model = req.auth.role === "representative" ? Representative : Customer;
  const account = await Model.findById(req.auth.sub).select("-password");
  if (!account) return res.status(404).json({ message: "Account not found" });
  res.json(account);
}));
app.get("/getCustomer/:id", ...requireRole("customer"), asyncRoute(async (req, res) => {
  if (req.params.id !== req.auth.sub) return res.status(403).json({ message: "Access denied" });
  const customer = await Customer.findById(req.auth.sub).select("first_name surname email");
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer);
}));
app.get("/getAllCustomers", ...requireRole("representative"), asyncRoute(async (req, res) => {
  const reservations = await Reservation.find({ rep_id: req.auth.sub }).select("customer_id");
  const ids = [...new Set(reservations.map((item) => item.customer_id))].filter(isId);
  res.json(await Customer.find({ _id: { $in: ids } }).select("first_name surname"));
}));

// Ownership is always derived from the signed token, never from a submitted rep_id.
const ownedResources = {
  Dish: { Model: Dish, required: ["dish_name", "description", "category", "price"], fields: ["dish_name", "dish_image", "description", "category", "price"] },
  Category: { Model: Category, required: ["category_name"], fields: ["category_name", "category_image"] },
  Promotion: { Model: Promotion, required: ["promotion_title", "description"], fields: ["promotion_title", "promotion_image", "description"] },
};
for (const [label, config] of Object.entries(ownedResources)) {
  app.post(`/create${label}`, ...requireRole("representative"), asyncRoute(async (req, res) => {
    const absent = missing(req.body, config.required);
    if (absent.length) return res.status(400).json({ message: `Missing required fields: ${absent.join(", ")}` });
    if (label === "Dish" && (!Number.isFinite(Number(req.body.price)) || Number(req.body.price) < 0)) return res.status(400).json({ message: "Price must be a non-negative number" });
    if (label === "Dish" && (!isId(req.body.category) || !(await Category.exists({ _id: req.body.category, rep_id: req.auth.sub })))) {
      return res.status(400).json({ message: "Category must belong to your restaurant" });
    }
    const values = Object.fromEntries(config.fields.filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]]));
    res.status(201).json(await config.Model.create({ ...values, rep_id: req.auth.sub }));
  }));
  app.put(`/update${label}/:id`, ...requireRole("representative"), asyncRoute(async (req, res) => {
    if (!isId(req.params.id)) return res.status(400).json({ message: `Invalid ${label.toLowerCase()} id` });
    if (label === "Dish" && req.body.category !== undefined && (!isId(req.body.category) || !(await Category.exists({ _id: req.body.category, rep_id: req.auth.sub })))) {
      return res.status(400).json({ message: "Category must belong to your restaurant" });
    }
    const values = Object.fromEntries(config.fields.filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]]));
    const record = await config.Model.findOneAndUpdate({ _id: req.params.id, rep_id: req.auth.sub }, { $set: values }, { new: true, runValidators: true });
    if (!record) return res.status(404).json({ message: `${label} not found` });
    res.json(record);
  }));
  app.delete(`/delete${label}/:id`, ...requireRole("representative"), asyncRoute(async (req, res) => {
    if (!isId(req.params.id)) return res.status(400).json({ message: `Invalid ${label.toLowerCase()} id` });
    const record = await config.Model.findOneAndDelete({ _id: req.params.id, rep_id: req.auth.sub });
    if (!record) return res.status(404).json({ message: `${label} not found` });
    res.json({ message: `${label} deleted` });
  }));
}

app.put("/updateRepresentative/:id", ...requireRole("representative"), asyncRoute(async (req, res) => {
  if (req.params.id !== req.auth.sub) return res.status(403).json({ message: "Access denied" });
  const updates = {};
  for (const field of ["restaurant_name", "restaurant_image", "address"]) if (req.body[field] !== undefined) updates[field] = String(req.body[field]).trim();
  if (req.body.email !== undefined) {
    const email = emailOf(req.body.email);
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address" });
    if (await Representative.exists({ email, _id: { $ne: req.auth.sub } })) return res.status(409).json({ message: "An account with that email already exists" });
    updates.email = email;
  }
  if (req.body.password) {
    if (String(req.body.password).length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
    updates.password = await bcrypt.hash(String(req.body.password), 12);
  }
  const account = await Representative.findByIdAndUpdate(req.auth.sub, { $set: updates }, { new: true, runValidators: true }).select("-password");
  if (!account) return res.status(404).json({ message: "Account not found" });
  res.json(account);
}));

app.post("/createReservation", ...requireRole("customer"), asyncRoute(async (req, res) => {
  const absent = missing(req.body, ["rep_id", "date", "time", "visitors"]);
  if (absent.length) return res.status(400).json({ message: `Missing required fields: ${absent.join(", ")}` });
  if (!isId(req.body.rep_id) || !(await Representative.exists({ _id: req.body.rep_id }))) return res.status(400).json({ message: "Restaurant does not exist" });
  const visitors = Number(req.body.visitors);
  if (!Number.isInteger(visitors) || visitors < 1 || visitors > 100) return res.status(400).json({ message: "Visitors must be a whole number between 1 and 100" });
  res.status(201).json(await Reservation.create({ rep_id: req.body.rep_id, customer_id: req.auth.sub, date: String(req.body.date), time: String(req.body.time), visitors }));
}));

app.get("/getReservation/:id", authenticate, asyncRoute(async (req, res) => {
  if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid reservation id" });
  const record = await Reservation.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Reservation not found" });
  const owns = req.auth.role === "customer" ? record.customer_id === req.auth.sub : record.rep_id === req.auth.sub;
  if (!owns) return res.status(403).json({ message: "Access denied" });
  res.json(record);
}));
app.get("/getAllReservations", authenticate, asyncRoute(async (req, res) => {
  res.json(await Reservation.find(req.auth.role === "customer" ? { customer_id: req.auth.sub } : { rep_id: req.auth.sub }));
}));
app.get("/getAllReservationsByRepId/:rep_id", ...requireRole("representative"), asyncRoute(async (req, res) => {
  if (req.params.rep_id !== req.auth.sub) return res.status(403).json({ message: "Access denied" });
  res.json(await Reservation.find({ rep_id: req.auth.sub }));
}));
app.get("/getAllReservationsByCustomerId/:customer_id", ...requireRole("customer"), asyncRoute(async (req, res) => {
  if (req.params.customer_id !== req.auth.sub) return res.status(403).json({ message: "Access denied" });
  res.json(await Reservation.find({ customer_id: req.auth.sub }));
}));
app.get("/getAllReservationsByRepIdAndCustomerId/:rep_id/:customer_id", authenticate, asyncRoute(async (req, res) => {
  const allowed = (req.auth.role === "representative" && req.params.rep_id === req.auth.sub) || (req.auth.role === "customer" && req.params.customer_id === req.auth.sub);
  if (!allowed) return res.status(403).json({ message: "Access denied" });
  res.json(await Reservation.find({ rep_id: req.params.rep_id, customer_id: req.params.customer_id }));
}));

async function ownedReservation(req, res) {
  if (!isId(req.params.id)) { res.status(400).json({ message: "Invalid reservation id" }); return null; }
  const record = await Reservation.findById(req.params.id);
  if (!record) { res.status(404).json({ message: "Reservation not found" }); return null; }
  const owns = req.auth.role === "customer" ? record.customer_id === req.auth.sub : record.rep_id === req.auth.sub;
  if (!owns) { res.status(403).json({ message: "Access denied" }); return null; }
  return record;
}
app.put("/updateReservation/:id", authenticate, asyncRoute(async (req, res) => {
  const record = await ownedReservation(req, res);
  if (!record) return;
  for (const field of ["date", "time", "visitors"]) if (req.body[field] !== undefined) record[field] = req.body[field];
  await record.save();
  res.json(record);
}));
app.delete("/deleteReservation/:id", authenticate, asyncRoute(async (req, res) => {
  const record = await ownedReservation(req, res);
  if (!record) return;
  await record.deleteOne();
  res.json({ message: "Reservation deleted" });
}));

const imageUpload = multer({
  storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, done) {
    const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype);
    done(ok ? null : new Error("Only JPEG, PNG, WebP, and GIF images are allowed"), ok);
  },
}).single("image");

function detectedImageMime(buffer) {
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString("ascii"))) return "image/gif";
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  return null;
}

app.post("/upload", ...requireRole("representative"), (req, res, next) => imageUpload(req, res, async (error) => {
  if (error) return next(error);
  if (!req.file) return res.status(400).json({ message: "Choose an image to upload" });
  if (detectedImageMime(req.file.buffer) !== req.file.mimetype) {
    return res.status(400).json({ message: "The uploaded file content is not a valid supported image" });
  }
  if (!process.env.CLOUDINARY_URL) return res.status(503).json({ message: "Image storage is not configured" });
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "restaurant-app", resource_type: "image" }, (err, uploaded) => err ? reject(err) : resolve(uploaded));
      stream.end(req.file.buffer);
    });
    res.status(201).json({ filePath: result.secure_url });
  } catch (uploadError) { next(uploadError); }
}));

app.use((_req, res) => res.status(404).json({ message: "Endpoint not found" }));
app.use((error, _req, res, _next) => {
  console.error(error.message);
  if (error instanceof multer.MulterError) return res.status(400).json({ message: error.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller" : error.message });
  if (["Only JPEG, PNG, WebP, and GIF images are allowed", "Origin is not allowed by CORS"].includes(error.message)) return res.status(error.message.startsWith("Origin") ? 403 : 400).json({ message: error.message });
  if (["ValidationError", "CastError"].includes(error.name)) return res.status(400).json({ message: "Invalid request data" });
  if (error.code === 11000) return res.status(409).json({ message: "That value is already in use" });
  res.status(500).json({ message: "An unexpected server error occurred" });
});

async function startServer() {
  const absent = ["MONGODB_URI", "JWT_SECRET"].filter((name) => !process.env[name]);
  if (absent.length) throw new Error(`Missing required environment variables: ${absent.join(", ")}`);
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  return app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
if (require.main === module) startServer().catch((error) => { console.error(`Unable to start server: ${error.message}`); process.exit(1); });
module.exports = { app, startServer };
