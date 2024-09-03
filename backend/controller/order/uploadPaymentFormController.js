const paymentFormModel = require("../../models/paymentFormModel");
const addToCartModel = require("../../models/cartProductModel");

async function uploadPaymentFormController(req, res) {
    try {
        // Create a new payment form entry from the request body
        const uploadPaymentForm = new paymentFormModel(req.body);
        const savePaymentForm = await uploadPaymentForm.save();

        // Get the user ID from the request
        const currentUser = req.userId;

        // Remove items from the cart for the current user
        await addToCartModel.deleteMany({ userId: currentUser });

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
        if (errorMessage.includes('bankslipImage')) {
            errorMessage = "ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ"; // "Please upload the bank slip image" in Lao
        } 
        if (errorMessage.includes('Cast to Number failed')) {
            errorMessage = "ຂໍ້ມູນທີ່ປ້ອນບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດຄືນ.";
        } 
        if (errorMessage.includes('validation failed')) {
            errorMessage = "ການກວດສອບລົ້ມເຫລວ, ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຖືກຕ້ອງ.";
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

//         // Fetch the saved payment form with populated cartItems
//         const paymentDetail = await paymentFormModel.findById(savePaymentForm._id).populate('cartItems');

//         // Send a successful response
//         res.status(201).json({
//             message: "ພວກເຮົາກຳລັງກວດສອບການຊຳລະເງິນຂອງທ່ານ..! ກົດໄປຍັງວັອດແອັບເພື່ອຮັບບິນຝາກເຄື່ອງ",
//             error: false,
//             success: true,
//             data: paymentDetail
//         });
//     } catch (err) {
//         let errorMessage = err.message || err;

//         // Translate common errors to Lao
//         if (errorMessage.includes('bankslipImage')) {
//             errorMessage = "ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ";
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

