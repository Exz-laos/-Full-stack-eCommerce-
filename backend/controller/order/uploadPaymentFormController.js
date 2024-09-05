// const paymentFormModel = require("../../models/paymentFormModel");
// const addToCartModel = require("../../models/cartProductModel");

// async function uploadPaymentFormController(req, res) {
//     try {
//         // Create a new payment form entry from the request body
//         const uploadPaymentForm = new paymentFormModel(req.body);
//         const savePaymentForm = await uploadPaymentForm.save();

//         // Get the user ID from the request
//         const currentUser = req.userId;

//         // Remove items from the cart for the current user
//         await addToCartModel.deleteMany({ userId: currentUser });

//         // Send a successful response
//         res.status(201).json({
//             message: "ພວກເຮົາກຳລັງກວດສອບການຊຳລະເງິນຂອງທ່ານ..! ກົດໄປຍັງວັອດແອັບເພື່ອຮັບບິນຝາກເຄື່ອງ",
//             error: false,
//             success: true,
//             data: savePaymentForm
//         });
//     } catch (err) {
//         let errorMessage = err.message || err;

//         // Translate common errors to Lao
//         if (errorMessage.includes('orderImage')) {
//             errorMessage = "ກະລຸນາອັບໂຫຼດຮູບລາຍການທີ່ທ່ານສັ່ງຊື້"; // "Please upload the bank slip image" in Lao
//         } 
//         if (errorMessage.includes('bankslipImage')) {
//             errorMessage = "ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ"; // "Please upload the bank slip image" in Lao
//         } 
//         if (errorMessage.includes('Cast to Number failed')) {
//             errorMessage = "ຂໍ້ມູນທີ່ປ້ອນບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດຄືນ.";
//         } 
//         if (errorMessage.includes('validation failed')) {
//             errorMessage = "ການກວດສອບລົ້ມເຫລວ, ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຖືກຕ້ອງ.";
//         }

//         // Handle any errors that occurred during the process
//         res.status(400).json({
//             message: errorMessage,
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = uploadPaymentFormController;

const paymentFormModel = require("../../models/paymentFormModel");
const addToCartModel = require("../../models/cartProductModel");

async function uploadPaymentFormController(req, res) {
    try {
        // Create a new payment form entry from the request body
        const uploadPaymentForm = new paymentFormModel(req.body);
        const savePaymentForm = await uploadPaymentForm.save();

        // Get the user ID from the request or guest session ID
        const currentUser = req.userId;
        const guestSessionId = req.session?.guestId; // Retrieve guest session ID for guest users

        // Remove items from the cart for the current user or guest
        await addToCartModel.deleteMany({
            ...(currentUser ? { userId: currentUser } : { guestId: guestSessionId })
        });

        // Send a successful response
        res.status(201).json({
            message: "ພວກເຮົາກຳລັງກວດສອບການຊຳລະເງິນຂອງທ່ານ..! ກົດໄປຍັງວັອດແອັບເພື່ອຮັບບິນຝາກເຄື່ອງ",
            error: false,
            success: true,
            data: savePaymentForm
        });
    } catch (err) {
        let errorMessage = err.message || err;

        // Translate common errors to Lao
        if (errorMessage.includes('orderImage')) {
            errorMessage = "ກະລຸນາອັບໂຫຼດຮູບລາຍການທີ່ທ່ານສັ່ງຊື້"; // "Please upload the bank slip image" in Lao
        } 
        if (errorMessage.includes('bankslipImage')) {
            errorMessage = "ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ"; // "Please upload the bank slip image" in Lao
        } 
        if (errorMessage.includes('Cast to Number failed')) {
            errorMessage = "ຂໍ້ມູນທີ່ປ້ອນບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດຄືນ."; // "Invalid input data, please check again."
        } 
        if (errorMessage.includes('validation failed')) {
            errorMessage = "ການກວດສອບລົ້ມເຫລວ, ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຖືກຕ້ອງ."; // "Validation failed, please provide correct information."
        }

        // Handle any errors that occurred during the process
        res.status(400).json({
            message: errorMessage,
            error: true,
            success: false
        });
    }
}

module.exports = uploadPaymentFormController;


