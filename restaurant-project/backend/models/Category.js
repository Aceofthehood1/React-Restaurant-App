const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_name: String,
    category_image: String,
})

const CategoryModel = mongoose.model("categories",CategorySchema); 
module.exports = CategoryModel;