// const mongoose = require('mongoose')

// const addToCart = mongoose.Schema({
//    productId : {
//         ref : 'product',
//         type : String,
//    },
//    quantity : Number,
//    userId : String,
// },{
//     timestamps : true
// })


// const addToCartModel = mongoose.model("addToCart",addToCart)

// module.exports = addToCartModel


const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
    productId: {
        ref : 'product',
        type : String,

    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you might reference a User schema
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const addToCartModel = mongoose.model('AddToCart', addToCartSchema);

module.exports = addToCartModel;
