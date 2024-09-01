

// const stripe = require('../../config/stripe');
// const userModel = require("../../models/userModel");

// const paymentController = async (request, response) => {
//     try {
//         const { cartItems } = request.body;
//         console.log("CartItems", cartItems);

//         const user = await userModel.findOne({
//             _id: request.userId
//         });

//         const params = {
//             submit_type: 'pay',
//             mode: 'payment',
//             payment_method_types: ['card'],
//             billing_address_collection: 'auto',
//             shipping_options: [
//                 {
//                     shipping_rate: 'shr_1PszEyP0fi1YZUTAC48wB25E'
//                 }
//             ],
//             customer_email: user.email,
//             line_items: cartItems.map((item) => {
//                 return {
//                     price_data: {
//                         currency: 'lak',
//                         product_data: {
//                             name: item.productId.productName,
//                             // Filter out empty image URLs
//                             images: item.productId.productImage.filter(image => image && image.trim() !== ''),
//                             metadata: {
//                                 productId: item.productId._id
//                             }
//                         },
//                         // Ensure unit_amount is an integer
//                         unit_amount: Math.round(item.productId.sellingPrice * 100)
//                     },
//                     adjustable_quantity: {
//                         enabled: true,
//                         minimum: 1
//                     },
//                     quantity: item.quantity
//                 };
//             }),
//             success_url: `${process.env.FRONTEND_URL}/success`,
//             cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//         };

//         const session = await stripe.checkout.sessions.create(params);
//         response.status(303).json(session);
//     } catch (error) {
//         response.json({
//             message: error?.message || error,
//             error: true,
//             success: false
//         });
//     }
// };

// module.exports = paymentController;

