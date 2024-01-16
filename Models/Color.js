const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
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
        code: {
            type: String,
            required: true,
            unique: true
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
const Color = mongoose.model("Color", ColorSchema);

module.exports = Color;
