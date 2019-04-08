var mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    productId: String,
    productTitle: String,
    productName: String,
    productDescription: String,
    overview: String,
    price: Number,
    color: String, 
    productImageName: [String],
    subCategory: String,
    bulletPoints: String,
    mfdQty: Number,
    // details
    styleCode: String, 
    material: String,
    weight: String,
    height: String,
    occassion: String,
    mrp: Number,
    sp: Number,
    //size

    size: [{
        sizeName: String,
        skuCode: String
    }],

});




const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
