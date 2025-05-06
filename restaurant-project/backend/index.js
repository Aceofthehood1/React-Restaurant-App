const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyparser = require('body-parser');
const imgSchema = require('./models/Image');
const fs = require('fs');
var path = require('path');

//Models
const CustomerModel = require('./models/Customers');
const RepresentativeModel = require('./models/Representatives');
const DishModel = require('./models/Dish');
const CategoryModel = require('./models/Category');
const PromotionModel = require('./models/Promotion');
const ReservationModel = require('./models/Reservation')
const Image = require('./models/Image');

//calling server variables
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
require('dotenv').config();

mongoose.connect("mongodb+srv://gameble01:Xlr8hgyk@restaurants.zuescvh.mongodb.net/Restaurants?retryWrites=true&w=majority&appName=Restaurants")
//Find Requests

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
  // Init upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
  }).single('image');
  
  // Serve static files from the uploads directory
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Route for uploading image
  app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.json({ filePath: `uploads/${req.file.filename}` });
    });
  });

  //End For Image

//Dishes
app.get('/getDish/:id', (req, res) => {
    const id = req.params.id;
    DishModel.findById({_id:id})
    .then(dish => res.json(dish))
    .catch(err => res.json(err))
})
app.get('/getAllDishes', async(req,res) => {
    await DishModel.find({})
    .then(dishes => res.json(dishes))
    .catch(err => res.json(err))
})
app.get('/getAllDishesByRepId/:rep_id', async(req,res) => { //getting all dishes based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    await DishModel.find({rep_id})
    .then(dishes => res.json(dishes))
    .catch(err => res.json(err))
})
app.get('/getAllDishesByRepIdAndCategoryId/:rep_id/:category', async(req,res) => { //getting all dishes based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    const category = req.params.category
    await DishModel.find({rep_id,category})
    .then(dishes => res.json(dishes))
    .catch(err => res.json(err))
})

//Categories
app.get('/getCategory/:id', (req, res) => { //for a particular category
    const id = req.params.id;
    CategoryModel.findById({_id:id})
    .then(category => res.json(category))
    .catch(err => res.json(err))
})
app.get('/getAllCategories', async(req,res) => {
    await CategoryModel.find({})
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})
app.get('/getAllCategoriesByRepId/:rep_id', async(req,res) => { //getting all categories based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    await CategoryModel.find({rep_id})
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})
app.get('/getAllCategoriesByRepIdAndCategoryId/:rep_id/:category_id', async(req,res) => { //getting all categories based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    const category_id = req.params.category_id
    await CategoryModel.find({rep_id, category_id})
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})

//Promotions
app.get('/getPromotion/:id', (req, res) => {
    const id = req.params.id;
    PromotionModel.findById({_id:id})
    .then(promotion => res.json(promotion))
    .catch(err => res.json(err))
})
app.get('/getAllPromotions', async(req,res) => {
    await PromotionModel.find({})
    .then(promotions => res.json(promotions))
    .catch(err => res.json(err))
})
app.get('/getAllPromotionsByRepId/:rep_id', async(req,res) => { //getting all promotions based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    await PromotionModel.find({rep_id})
    .then(promotions => res.json(promotions))
    .catch(err => res.json(err))
})

//Representatives
app.get('/getRepresentative/:id', (req, res) => {
    const id = req.params.id;
    RepresentativeModel.find({_id:id})
    .then(representative => res.json(representative))
    .catch(err => res.json(err))
})

app.get('/getAllRepresentatives', async(req,res) => {
    await RepresentativeModel.find({})
    .then(representatives => res.json(representatives))
    .catch(err => res.json(err))
})


//Customers
app.get('/getCustomer/:id', (req, res) => {
    const id = req.params.id;
    CustomerModel.find({_id:id})
    .then(customer => res.json(customer))
    .catch(err => res.json(err))
})
app.get('/getAllCustomers', async(req,res) => {
    await CustomerModel.find({})
    .then(customers => res.json(customers))
    .catch(err => res.json(err))
})

//Reservations
app.get('/getReservation/:id', (req, res) => {
    const id = req.params.id;
    ResevationModel.find({_id:id})
    .then(reservation => res.json(reservation))
    .catch(err => res.json(err))
})
app.get('/getAllReservations', async(req,res) => {
    await ReservationModel.find({})
    .then(reservations => res.json(reservations))
    .catch(err => res.json(err))
})
app.get('/getAllReservationsByRepId/:rep_id', async(req,res) => { //getting all reservations based on the rep_id
    const rep_id = req.params.rep_id  //use field name here example category_name
    await ReservationModel.find({rep_id})
    .then(reservations => res.json(reservations))
    .catch(err => res.json(err))
})
app.get('/getAllReservationsByCustomerId/:customer_id', async(req,res) => { //getting all reservations based on the customer_id
    const customer_id = req.params.customer_id  //use field name here example category_name
    await ReservationModel.find({customer_id})
    .then(reservations => res.json(reservations))
    .catch(err => res.json(err))
})
app.get('/getAllReservationsByRepIdAndCustomerId/:rep_id/:customer_id', async(req,res) => { //getting all reservations based on the rep_id
    const rep_id = req.params.rep_id
    const customer_id = req.params.customer_id
    await ReservationModel.find({rep_id, customer_id})
    .then(reservations => res.json(reservations))
    .catch(err => res.json(err))
})

//Logins
//Representatives login
app.post('/loginRepresentative', (req, res) => {
    const {email, password} = req.body;
    RepresentativeModel.findOne({email:email})
    .then(representative => {
        if(representative){
            if(representative.password === password){
                res.json(["Logged in Successfully",representative._id])
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record exists")
        }})
    .catch(err => res.json(err))
})

//Customers login
app.post('/loginCustomer', (req, res) => {
    const {email, password} = req.body;
    CustomerModel.findOne({email:email})
    .then(customer => {
        if(customer){
            if(customer.password === password){
                res.json(["Logged in Successfully",customer._id])
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record exists")
        }})
    .catch(err => res.json(err))
})

// Create Requests

//Create Customers
app.post("/createCustomer",(req,res) => { //Used for Customers Creation
    CustomerModel.create(req.body)
    .then(customers => res.json(customers))
    .catch(err => res.json(err))
})

//Create Representatives
app.post("/createRep",(req,res) => { //Used for Restaurant Representatives
    RepresentativeModel.create(req.body)
    .then(representatives => res.json(representatives))
    .catch(err => res.json(err))
})

//Create Dishes
app.post("/createDish",(req,res) => { //Used for Restaurant Representatives
    DishModel.create(req.body)
    .then(dishes => res.json(dishes))
    .catch(err => res.json(err))
})

//Create Category
app.post("/createCategory",(req,res) => { //Used for Restaurant Categories
    CategoryModel.create(req.body)
    .then(categories => res.json(categories))
    .catch(err => res.json(err))
})

//Create Promotion
app.post("/createPromotion",(req,res) => { //Used for Restaurant Promotions
    PromotionModel.create(req.body)
    .then(promotions => res.json(promotions))
    .catch(err => res.json(err))
})

//Create Reservation
app.post("/createReservation",(req,res) => { //Used for Restaurant Reservations
    ReservationModel.create(req.body)
    .then(reservations => res.json(reservations))
    .catch(err => res.json(err))
})

//DELETE REQUESTS

// Delete Dish
app.delete("/deleteDish/:id",(req,res) => { //Used for deleting restaurant dishes
    const id = req.params.id;
    DishModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.delete("/deleteCategory/:id",(req,res) => { //Used for deleting restaurant categories
    const id = req.params.id;
    CategoryModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.delete("/deletePromotion/:id",(req,res) => { //Used for deleting restaurant promotions
    const id = req.params.id;
    PromotionModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.delete("/deleteReservation/:id",(req,res) => { //Used for deleting restaurant reservations
    const id = req.params.id;
    ReservationModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

//Updates

//Update Dish
app.put("/updateDish/:id", (req,res) => {
    const id = req.params.id
    DishModel.findByIdAndUpdate({_id:id},{
        dish_name: req.body.dish_name,
        dish_image: req.body.dish_image,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price
    })
    .then(dish => res.json(dish))
    .catch(err => res.json(err))
})

//Update Category
app.put("/updateCategory/:id", (req,res) => {
    const id = req.params.id
    CategoryModel.findByIdAndUpdate({_id:id},{
        category_name: req.body.category_name,
        category_image: req.body.category_image
    })
    .then(category => res.json(category))
    .catch(err => res.json(err))
})

//Update Promotion
app.put("/updatePromotion/:id", (req,res) => {
    const id = req.params.id
    PromotionModel.findByIdAndUpdate({_id:id},{
        promotion_title: req.body.promotion_title,
        description: req.body.description,
        promotion_image: req.body.promotion_image
    })
    .then(promotion => res.json(promotion))
    .catch(err => res.json(err))
})

//Update Representative
app.put("/updateRepresentative/:id", (req,res) => {
    const id = req.params.id
    RepresentativeModel.findByIdAndUpdate({_id:id},{
        restaurant_name: req.body.restaurant_name,
        restaurant_image: req.body.restaurant_image,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    })
    .then(category => res.json(category))
    .catch(err => res.json(err))
})

//Update Reservation
app.put("/updateReservation/:id", (req,res) => {
    const id = req.params.id
    RepresentativeModel.findByIdAndUpdate({_id:id},{
        date: req.body.date,
        time: req.body.time,
        visitors: req.body.visitors
    })
    .then(reservation => res.json(reservation))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running');
})

/**
 * const[first_name, setFirstName] = useState <string>();
  const[surname, setSurname] = useState <string>();
  const[email, setEmail] = useState<string>();
  const[password, setPassword] = useState<string>();

 */