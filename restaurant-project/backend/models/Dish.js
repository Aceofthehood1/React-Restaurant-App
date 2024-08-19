const mongoose = require('mongoose');

const DishesSchema = new mongoose.Schema({
    rep_id: String,
    dish_name: String,
    dish_image: String,
    description: String,
    category: String,
    price: Number
})

const DishModel = mongoose.model("Dishes",DishesSchema); 
module.exports = DishModel;