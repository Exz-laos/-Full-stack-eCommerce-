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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const addToCartModel = mongoose.model('AddToCart', addToCartSchema);

module.exports = addToCartModel;


// const mongoose = require('mongoose');

// const addToCartSchema = new mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'product', // Reference to the Product model
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// const addToCartModel = mongoose.model('AddToCart', addToCartSchema);

// module.exports = addToCartModel;
