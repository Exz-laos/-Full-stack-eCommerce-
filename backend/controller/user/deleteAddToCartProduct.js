// const addToCartModel = require("../../models/cartProductModel")

// const deleteAddToCartProduct = async(req,res)=>{
//     try{
//         const currentUserId = req.userId 
//         const addToCartProductId = req.body._id

//         const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId})

//         res.json({
//             message : "Product Deleted From Cart",
//             error : false,
//             success : true,
//             data : deleteProduct
//         })

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = deleteAddToCartProduct

const addToCartModel = require("../../models/cartProductModel");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const sessionId = req.cookies?.sessionId;
        const addToCartProductId = req.body._id;

        // Delete the product from the cart based on userId or sessionId
        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            ...(currentUserId ? { userId: currentUserId } : { sessionId })
        });

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;

