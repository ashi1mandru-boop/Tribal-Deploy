const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    // Mapping keys exactly as per your Excel headers
    order_id: String,           // Maps to jobOrNumber (e.g., 1234)
    internal_id: String,        // Maps to orderId (e.g., ID-1766...)
    customer_name: String,
    items_count: Number,
    order_placedby: String,
    received_date_time: String,
    dispatch_date: String,
    dispatch_time: String,
    dispatch_location: String,
    designer_comments_neworder: String,
    
    // Statuses - initialized to "New"
    last_updated_status: { type: String, default: "New" },
    last_updated_department: { type: String, default: "Designer" },
    last_updated_time: { type: Date, default: Date.now },
    
    design_status: { type: String, default: "New" },
    setting_status: { type: String, default: "New" },
    payment_status: { type: String, default: "New" },
    raw_material_status: { type: String, default: "New" },
    cutting_status: { type: String, default: "New" },
    fusing_status: { type: String, default: "New" },
    printing_status: { type: String, default: "New" },
    screen_status: { type: String, default: "New" },
    stiching_status: { type: String, default: "New" },
    trimming_packing_status: { type: String, default: "New" },
    dispatch_status: { type: String, default: "New" },
    
    images: [String] // Array for the image URLs
}, { collection: 'workflow' });

module.exports = mongoose.model('Workflow', workflowSchema);