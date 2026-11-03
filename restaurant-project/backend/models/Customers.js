const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    first_name: String,
    surname: String,
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }
})

const CustomerModel = mongoose.model("Customers",CustomersSchema); 
module.exports = CustomerModel;
