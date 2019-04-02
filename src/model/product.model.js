var mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    productTitle: String,
    productName: String,
    productDescription: String,
    shortDescription: String, 
    price: Number,
    color: String, 
    styleCode: String, 
    skuCode: String, 
    productImageName: [String],
    mainCategory: [String]
});


const Product = mongoose.model('product', ProductSchema);
module.exports = Product;