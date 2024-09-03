const paymentFormModel = require('../../models/paymentFormModel');

// Controller to update order status
const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId, status } = req.params;

        // Validate status
        const validStatuses = ['wait', 'pay', 'send', 'cancel'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value',
                error: true,
                success: false
            });
        }

        const updatedOrder = await paymentFormModel.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found',
                error: true,
                success: false
            });
        }

        res.json({
            message: 'Order status updated successfully',
            success: true,
            error: false,
            data: updatedOrder
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = updateOrderStatusController;



