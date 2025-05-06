const mongoose = require('mongoose');

const ReservationsSchema = new mongoose.Schema({
    rep_id: String,
    customer_id : String,
    date: String,
    time: String,
    visitors: Number
})

const ReservationModel = mongoose.model("Reservations",ReservationsSchema); 
module.exports = ReservationModel;