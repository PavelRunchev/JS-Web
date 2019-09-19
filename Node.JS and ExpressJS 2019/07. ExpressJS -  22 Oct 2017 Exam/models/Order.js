const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true },
    date: { type: mongoose.SchemaTypes.Date, default: Date.now },
    toppings: [{ type: mongoose.SchemaTypes.String }],
    status: {
        type: mongoose.SchemaTypes.String,
        default: 'Pending',
        enum: ['Pending', 'In progress', 'In transit', 'Delivered']
    }
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;