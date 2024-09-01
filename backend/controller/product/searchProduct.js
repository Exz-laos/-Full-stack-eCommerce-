const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        // Create a case-insensitive regex for searching
        const regex = new RegExp(query, 'i');

        // Fetch products where productName or category matches the regex and ensure they are available
        const products = await productModel.find({
            "$and": [
                {
                    "$or": [
                        { productName: regex },
                        { category: regex }
                    ]
                },
                { available: true }
            ]
        });

        res.json({
            data: products,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || 'An error occurred while searching for products.',
            error: true,
            success: false
        });
    }
};

module.exports = searchProduct;
