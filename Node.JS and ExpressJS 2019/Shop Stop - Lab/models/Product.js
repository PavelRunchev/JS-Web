const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    price: { type: mongoose.SchemaTypes.Number, min: 0, max: 100000, default: 0, required: true },
    image: { type: mongoose.SchemaTypes.String, required: true },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    buyer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;