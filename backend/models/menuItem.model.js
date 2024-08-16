const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    category:String,
    veg:Boolean,
    price: Number,
    description: String,
    restaurantId: {
        type: String,
        required: true
    }
});

const menuItemModel = mongoose.model("menuItem", menuItemSchema);

module.exports = menuItemModel;