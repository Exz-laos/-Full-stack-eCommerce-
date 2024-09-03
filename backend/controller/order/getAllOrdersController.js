

// // Controller to get all orders
// const getAllOrdersController = async (req, res) => {
//     try {
//         const allOrders = await paymentFormModel.find()
//             .populate('cartItems')
//             .sort({ createdAt: -1 });
//         res.json({
//             message: 'All Orders',
//             success: true,
//             error: false,
//             data: allOrders
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// };







// const getAllOrdersController = async (req, res) => {
//     try {
//         const allOrders = await paymentFormModel.find()
//             .populate({
//                 path: 'cartItems',
//                 populate: { path: 'productId', select: 'productName price' } // Assuming cartItems reference a product model
//             })
//             .sort({ createdAt: -1 });
//         res.json({
//             message: 'All Orders',
//             success: true,
//             error: false,
//             data: allOrders
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// };
const paymentFormModel = require('../../models/paymentFormModel.js');

const getAllOrdersController = async (req, res) => {
    try {
        const allOrders = await paymentFormModel.find()
            .populate({
                path: 'cartItems',
                populate: {
                    path: 'productId', // Assuming the AddToCart model contains a reference to the Product
                    select: 'productName price' // Fetch only necessary fields
                }
            })
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
