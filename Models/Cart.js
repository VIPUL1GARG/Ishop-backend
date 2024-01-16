const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
        },
        pId: {
            type: mongoose.Types.ObjectId,
        },
        qty: {
            type: Number,
            default: 1
        },
        updatedAt: {
            type: String,
            default: new Date().getTime()
        },
        createdAt: {
            type: String,
            default: new Date().getTime()
        }

    },
    {
        timestamps: true,
    }
)
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
