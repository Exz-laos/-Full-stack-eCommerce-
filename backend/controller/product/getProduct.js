const productModel = require("../../models/productModel")

const getProductController = async(req,res)=>{
    try{
        const allProduct = await productModel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getProductController




// const productModel = require("../../models/productModel");

// const getProductController = async (req, res) => {
//     try {
//         // Fetch only products where 'available' is true, sorted by creation date (newest first)
//         const availableProducts = await productModel.find({ available: true }).sort({ createdAt: -1 });

//         res.json({
//             message: "Available Products",
//             success: true,
//             error: false,
//             data: availableProducts
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// };

// module.exports = getProductController;

