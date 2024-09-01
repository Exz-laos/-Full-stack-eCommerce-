const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;

        // Fetch product by ID and ensure it is available
        const product = await productModel.findOne({ _id: productId, available: true });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or not available",
                error: true,
                success: false
            });
        }

        res.json({
            data: product,
            message: "Product details retrieved successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || 'An error occurred while retrieving product details.',
            error: true,
            success: false
        });
    }
};

module.exports = getProductDetails;
