// const addToCartModel = require("../../models/cartProductModel")

// const addToCartViewProduct = async(req,res)=>{
//     try{
//         const currentUser = req.userId

//         const allProduct = await addToCartModel.find({
//             userId : currentUser
//         }).populate("productId")

//         res.json({
//             data : allProduct,
//             success : true,
//             error : false
//         })

//     }catch(err){
//         res.json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports =  addToCartViewProduct




const addToCartModel = require("../../models/cartProductModel");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;
        const sessionId = req.cookies?.sessionId;

        // Find products for either logged-in users or guest users
        const allProduct = await addToCartModel.find({
            ...(currentUser ? { userId: currentUser } : { sessionId })
        }).populate("productId");

        res.json({
            data: allProduct,
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProduct;
