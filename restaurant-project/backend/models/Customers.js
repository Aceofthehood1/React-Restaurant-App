const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    first_name: String,
    surname: String,
    email: String,
    password: String
})

const CustomerModel = mongoose.model("Customers",CustomersSchema); 
module.exports = CustomerModel;