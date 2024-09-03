
const addToCartModel = require("../../models/cartProductModel")
const getItemDetailsController = async (req, res) => {
    const { itemId } = req.params;

    try {
        const item = await addToCartModel.findById(itemId);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch item details', error: error.message });
    }
};

module.exports = getItemDetailsController;
