const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    data: Buffer,
    content_type: String,
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Image = mongoose.model("Image",ImageSchema); 
module.exports = Image;