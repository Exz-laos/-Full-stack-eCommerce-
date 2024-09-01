// const productModel = require("../../models/productModel")

// const getCategoryProduct = async(req,res)=>{
//     try{
//         const productCategory = await productModel.distinct("category")

//         console.log("category",productCategory)

//            //array to store one product from each category   , one by one

//         const productByCategory = []
//         for(const category of productCategory){
//             const product = await productModel.findOne({category})

//             if(product){
//                 productByCategory.push(product)
//             }
//         }
//         res.json({
//             message : "category product",
//             data : productByCategory,
//             success : true,
//             error : false
//         })
        
        
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = getCategoryProduct

const productModel = require("../../models/productModel");
const getCategoryProduct = async (req, res) => {
    try {
        // Get distinct categories
        const productCategories = await productModel.distinct("category");

        // Fetch one available product from each category
        const productPromises = productCategories.map(category =>
            productModel.findOne({ category, available: true }).exec()
        );

        // Wait for all promises to resolve
        const productsByCategory = await Promise.all(productPromises);

        // Filter out null results in case some categories don't have available products
        const filteredProducts = productsByCategory.filter(product => product !== null);

        res.json({
            message: "Category Products",
            data: filteredProducts,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || 'An error occurred while fetching category products.',
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryProduct;
