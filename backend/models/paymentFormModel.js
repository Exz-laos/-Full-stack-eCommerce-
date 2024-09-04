const mongoose = require('mongoose');
const AddToCart = require('./cartProductModel'); // Ensure path is correct
const paymentSchema = mongoose.Schema({
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddToCart' 
    }],
    orderImage: {
        type: [],
        required: [true, 'ກະລຸນາອັບໂຫຼດຮູບລາຍການທີ່ທ່ານສັ່ງຊື້'],
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'ກະລຸນາອັບໂຫຼດຮູບລາຍການທີ່ທ່ານສັ່ງຊື້'
        }
    },
    customerName: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນຊື່ລູກຄ້າ']
    },
    customerSurname: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນນາມສະກຸນລູກຄ້າ']
    },
    customerPhone: {
        type: Number,
        validate: {
            validator: function(v) {
                const phoneString = v.toString();
                return phoneString.length >= 7 && phoneString.length <= 15;
            },
            message: props => `${props.value} ບໍ່ແມ່ນເບີໂທທີ່ຖືກຕ້ອງ! ມັນຄວນຈະມີ 7 ຫາ 15 ຕົວເລກ.`
        }
    },
    customerWhatsapp: {
        type: Number,
        required: [true, 'ກະລຸນາປ້ອນເບີ WhatsApp'],
        validate: {
            validator: function(v) {
                const whatsappString = v.toString();
                return whatsappString.length >= 7 && whatsappString.length <= 15;
            },
            message: props => `${props.value} ບໍ່ແມ່ນເບີ WhatsApp ທີ່ຖືກຕ້ອງ! ມັນຄວນຈະມີ 7 ຫາ 15 ຕົວເລກ.`
        }
    },
    shippingChoice: {
        type: String,
        required: [true, 'ກະລຸນາເລືອກວິທີການຈັດສົ່ງ']
    },
    shippingChoiceName: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນຊື່ວິທີການຈັດສົ່ງ']
    },
    bankslipImage: {
        type: [],
        required: [true, 'ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ'],
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'ກະລຸນາອັບໂຫຼດສະລິບໂອນເງິນ'
        }
    },
    payDate: {
        type: Date,
        required: [true, 'ກະລຸນາປ້ອນວັນທີການຊຳລະ']
    },
    payTime: {
        type: String,
        required: [true, 'ກະລຸນາປ້ອນເວລາການຊຳລະ']
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: "wait"
    }
  
}, {
    timestamps: true
});

const paymentFormModel = mongoose.model('PaymentDetail', paymentSchema);

module.exports = paymentFormModel;