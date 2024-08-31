// const mongoose = require('mongoose')

// const productSchema = mongoose.Schema({
//     productName : String,
//     brandName : String,
//     category : String,
//     productImage : [],
//     description : String,
//     price : Number,
//     sellingPrice : Number
// },{
//     timestamps : true
// })


// const productModel = mongoose.model("product",productSchema)

// module.exports = productModel


const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    brandName: {
        type: String,
        default: 'No Brand'
    },
    category: String,
    productImage: [],
    description: {
        type: String,
        required: true // assuming that description is required
    },
    price: Number,
    sellingPrice: Number,
    quantity: Number,
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
