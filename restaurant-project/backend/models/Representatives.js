const mongoose = require('mongoose');

const RepresentativesSchema = new mongoose.Schema({
    restaurant_name: String,
    restaurant_image: String,
    address: String,
    email: String,
    password: String
})

const RepresentativeModel = mongoose.model("Representative",RepresentativesSchema); 
module.exports = RepresentativeModel;