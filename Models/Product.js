const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        slug: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
        best_seller: {
            type: Boolean,
            default: true,
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "category"
        },
        color_id: {
            type: mongoose.Types.ObjectId,
            ref: "color"
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
        },
        discount: {
            type: Number,
            default: 0,
        },
        finalPrice: {
            type: Number,
        },
        image: {
            type: String,
            default: null,
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
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
