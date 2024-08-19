const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    rep_id: String,
    promotion_title: String,
    promotion_image: String,
    description: String
})

const PromotionModel = mongoose.model("Promotions",PromotionSchema); 
module.exports = PromotionModel;

