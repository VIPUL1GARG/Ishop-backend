const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            unique: true,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        status: {
            type: Boolean,
            default: true,
        },
        forgot_password_otp: {
            type: Number,
            default: null
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
const User = mongoose.model("User", UserSchema);

module.exports = User;
