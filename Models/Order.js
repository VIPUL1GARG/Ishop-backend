const mongoose = require('mongoose');


// razor pay 
// key id--  rzp_test_CB7Q4EI1014Bup
// key secret -- M88vHz6JNQ3J2YPU6scm6Wpb
const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        order_details: {
            type: Array
        },
        user_details: {
            type: Object
        },
        razorpay_payment_id: {
            type: String,
            default: null
        },
        order_total: {
            type: Number,
        },
        order_status: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3, 4, 5, 6]
            // 0: Payment Pending  1: Order Placed  2: Dispatch  3: Shipped  4: Delivered  5: Cancelled 6: Returned
        },
        shipping_cost: {
            type: Number,
            default: 0,
        },
        promoCode: {
            name: {
                type: String,
                default: null,
            },
            discount: {
                type: Number,
                default: 0,
            },
        },
        transaction_id: {
            type: mongoose.Schema.Types.ObjectId,
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
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
