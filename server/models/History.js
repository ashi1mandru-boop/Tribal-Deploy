const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    OrderID: String,
    ReceivedDate: String,
    ReceivedTime: String,
    UserName: String,
    Department: String,
    Status: String,
    "Party Name": String,
    Comments: String,
    JobID: String,
    DispatchDate: String
}, { collection: 'history' }); // Target collection in Tribal DB

module.exports = mongoose.model('History', historySchema);