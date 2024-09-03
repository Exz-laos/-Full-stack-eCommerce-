const paymentFormModel = require('../../models/paymentFormModel.js');

// Controller to get all orders
const getAllOrdersController = async (req, res) => {
    try {
        const allOrders = await paymentFormModel.find()
            .populate('cartItems')
            .sort({ createdAt: -1 });
        res.json({
            message: 'All Orders',
            success: true,
            error: false,
            data: allOrders
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getAllOrdersController;
