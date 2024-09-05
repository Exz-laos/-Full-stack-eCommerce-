// const addToCartModel = require("../../models/cartProductModel")

// const updateAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req?.body?._id

//         const qty = req.body.quantity

//         const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
//             ...(qty && {quantity : qty})
//         })

//         res.json({
//             message : "Product Updated",
//             data : updateProduct,
//             error : false,
//             success : true
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = updateAddToCartProduct

const addToCartModel = require("../../models/cartProductModel");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const sessionId = req.cookies?.sessionId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        // Update the product in the cart for either logged-in users or guests
        const updateProduct = await addToCartModel.updateOne(
            {
                _id: addToCartProductId,
                ...(currentUserId ? { userId: currentUserId } : { sessionId })
            },
            {
                ...(qty && { quantity: qty })
            }
        );

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
