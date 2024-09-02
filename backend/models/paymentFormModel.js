const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນຊື່ລູກຄ້າ'] // "Please enter customer name" in Lao
    },
    customerSurname: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນນາມສະກຸນລູກຄ້າ'] // "Please enter customer surname" in Lao
    },
    customerPhone: {
        type: Number,
        validate: {
            validator: function(v) {
                const phoneString = v.toString(); // Convert number to string
                return phoneString.length >= 8 && phoneString.length <= 10; // Validate length
            },
            message: props => `${props.value} ບໍ່ແມ່ນເບີໂທທີ່ຖືກຕ້ອງ! ມັນຄວນຈະມີ 8 ຫາ 10 ຕົວເລກ.` // "is not a valid phone number! It should have 8 to 10 digits." in Lao
        }
    },
    customerWhatsapp: {
        type: Number,
        required: [true, 'ກະລຸນາປ້ອນເບີ WhatsApp'], // "Please enter WhatsApp number" in Lao
        validate: {
            validator: function(v) {
                const whatsappString = v.toString(); // Convert number to string
                return whatsappString.length >= 7 && whatsappString.length <= 12; // Validate length
            },
            message: props => `${props.value} ບໍ່ແມ່ນເບີ WhatsApp ທີ່ຖືກຕ້ອງ! ມັນຄວນຈະມີ 8 ຫາ 10 ຕົວເລກ.` // "is not a valid WhatsApp number! It should have 8 to 10 digits." in Lao
        }
    },
    shippingChoice: {
        type: String, 
        required: [true, 'ກະລຸນາເລືອກວິທີການຈັດສົ່ງ'] // "Please select a shipping choice" in Lao
    },
    shippingChoiceName: {
        type: String, 
        required: [true, 'ກະລຸນາປ້ອນຊື່ວິທີການຈັດສົ່ງ'] // "Please enter shipping choice name" in Lao
    },
    bankName: {
        type: String, 
        required: [true, 'ກະລຸນາເລືອກຊື່ທະນາຄານ'] // "Please select a bank name" in Lao
    },
    bankslipImage: {
        type: [], // Assuming this stores image URLs or file paths
        required: [true, 'ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ'], // "Please upload the bank slip image" in Lao
        validate: {
            validator: function(v) {
                return v.length > 0; // Ensure that the array is not empty
            },
            message: 'ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ' // "Please upload the bank slip image" in Lao
        }
    },
    payDate: {
        type: Date, 
        required: [true, 'ກະລຸນາປ້ອນວັນທີການຊຳລະ'] // "Please enter the payment date" in Lao
    },
    payTime: {
        type: String, // Store time as a string or combine with Date
        required: [true, 'ກະລຸນາປ້ອນເວລາການຊຳລະ'] // "Please enter the payment time" in Lao
    },
    note: {
        type: String,
    },
}, {
    timestamps: true
});

const paymentFormModel = mongoose.model('Payment detail', paymentSchema);

module.exports = paymentFormModel;
