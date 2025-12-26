const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    OrderID: String,
    Unique_OrderID: String,
    "Order Name": String,
    "Orders Count": String,
    Material: String,
    Specification: String,
    "Distribution Type": String,
    DispatchDate: String,
    "Image-1": String,
    "Image-2": String,
    "Image-3": String
}, { collection: 'orders' }); // Collection name in Tribal DB

module.exports = mongoose.model('Order', orderSchema);