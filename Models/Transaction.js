const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        amount: {
            type: Number
        },
        razorpay_order_id: {
            type: String,
        },
        razorpay_payment_id: {
            type: String,
        },
        payment_status: {
            type: Boolean,
            //1: Captured , 0: Failed
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
const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
