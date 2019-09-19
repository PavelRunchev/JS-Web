const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: mongoose.SchemaTypes.String, required: true },
    size: { type: mongoose.SchemaTypes.Number, required: true },
    imageUrl: { type: mongoose.SchemaTypes.String, required: true },
    toppings: [{ type: mongoose.SchemaTypes.String }]
});

productSchema.path('category').validate(function() {
    return this.category === 'Chicken' || this.category === 'Lamb' || this.category === 'Beef';
}, 'Duner must be only - Chicken, Lamb and Beef');

productSchema.path('size').validate(function() {
    return this.size === 17 || this.size === 21 || this.size === 24;
}, 'Duner size must be only - 17, 21 and 24!');

productSchema.path('imageUrl').validate(function() {
    return this.imageUrl.endsWith('.png');
}, 'Image URL must start with http and end with .jpg or .png');

const Product = mongoose.model('Product', productSchema);
module.exports = Product;