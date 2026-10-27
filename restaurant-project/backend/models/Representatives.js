const mongoose = require('mongoose');

const RepresentativesSchema = new mongoose.Schema({
    restaurant_name: String,
    restaurant_image: String,
    address: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }
})

const RepresentativeModel = mongoose.model("Representative",RepresentativesSchema); 
module.exports = RepresentativeModel;
