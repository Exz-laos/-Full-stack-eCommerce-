// const addToCartModel = require("../../models/cartProductModel")

// const countAddToCartProduct = async(req,res)=>{
//     try{
//         const userId = req.userId

//         const count = await addToCartModel.countDocuments({
//             userId : userId
//         })

//         res.json({
//             data : {
//                 count : count
//             },
//             message : "ok",
//             error : false,
//             success : true
//         })
//     }catch(error){
//         res.json({
//             message : error.message || error,
//             error : false,
//             success : false,
//         })
//     }
// }

// module.exports = countAddToCartProduct
const addToCartModel = require("../../models/cartProductModel");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;
        const sessionId = req.cookies?.sessionId;

        // Count the cart items for either a logged-in user or a guest
        const count = await addToCartModel.countDocuments({
            ...(userId ? { userId } : { sessionId })
        });

        res.json({
            data: { count },
            message: "ok",
            error: false,
            success: true
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;

