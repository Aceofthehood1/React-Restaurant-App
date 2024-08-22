const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    data: Buffer,
    content_type: String,
})

const ImageModel = mongoose.model("images",ImageSchema); 
module.exports = CategoryModel;