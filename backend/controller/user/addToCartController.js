// const addToCartModel = require("../../models/cartProductModel")

// const addToCartController = async(req,res)=>{
//     try{
//         const { productId } = req?.body
//         const currentUser = req.userId

//         const isProductAvailable = await addToCartModel.findOne({ 
//             productId, userId: currentUser})

//         console.log("isProductAvailabl   ",isProductAvailable)

//         if(isProductAvailable){
//             return res.json({
//                 message : "Already exits in Add to cart",
//                 success : false,
//                 error : true
//             })
//         }

//         const payload  = {
//             productId : productId,
//             quantity : 1,
//             userId : currentUser,
//         }

//         const newAddToCart = new addToCartModel(payload)
//         const saveProduct = await newAddToCart.save()


//         return res.json({
//             data : saveProduct,
//             message : "Product Added in Cart",
//             success : true,
//             error : false
//         })
        

//     }catch(err){
//         res.json({
//             message : err?.message || err,
//             error : true,
//             success : false
//         })
//     }
// }


// module.exports = addToCartController


const addToCartModel = require("../../models/cartProductModel");
const { v4: uuidv4 } = require('uuid');

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        let currentUser = req.userId;

        // Retrieve or generate sessionId for guest users
        let sessionId = req.cookies.sessionId || req.sessionId;
        if (!currentUser && !sessionId) {
            sessionId = uuidv4();
            res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        }

        // Check if the product is already in the cart
        const isProductAvailable = await addToCartModel.findOne({
            productId,
            ...(currentUser ? { userId: currentUser } : { sessionId })
        });

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            });
        }

        // Prepare payload and save the new cart item
        const payload = {
            productId,
            quantity: 1,
            ...(currentUser ? { userId: currentUser } : { sessionId })
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product Added to Cart",
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

module.exports = addToCartController;
