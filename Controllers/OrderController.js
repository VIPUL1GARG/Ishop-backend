const Order = require("../Models/Order");
const Product = require("../Models/Product");
const Razorpay = require('razorpay');
const Transaction = require("../Models/Transaction");
const crypto = require('crypto');
const Cart = require("../Models/Cart");
const instance = new Razorpay({
    key_id: 'rzp_test_CB7Q4EI1014Bup',
    key_secret: 'M88vHz6JNQ3J2YPU6scm6Wpb',
});
class OrderController {
    placeOrder(data) {
        return new Promise(
            (res, rej) => {
                try {
                    const order = new Order(data)
                    order.save()
                        .then(
                            () => {
                                var options = {
                                    amount: data.order_total * 100,  // amount in the smallest currency unit
                                    currency: "INR",
                                    receipt: order._id
                                };
                                instance.orders.create(
                                    options,
                                    function (err, razorOrder) {
                                        // console.log(err,razorOrder)
                                        if (!err) {
                                            res(
                                                {
                                                    msg: 'Order Created',
                                                    order,
                                                    razorOrder,
                                                    status: 1
                                                }
                                            )
                                        } else {
                                            // console.log(data.order_total,typeof data.order_total)
                                            // console.log(err,'err0')
                                            rej(
                                                {
                                                    msg: 'Unable to create order',
                                                    status: 0
                                                }
                                            )
                                        }
                                    });

                            }
                        )
                        .catch(
                            (err) => {
                                // console.log(err,'err1')
                                rej(
                                    {
                                        msg: 'Unable to create order2',
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (error) {
                    rej(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    orderSuccess({ order, razorOrder, response }) {
        return new Promise(
            (res, rej) => {
                try {
                    const hmac = crypto.createHmac('sha256', "M88vHz6JNQ3J2YPU6scm6Wpb");
                    hmac.update(response.razorpay_order_id + "|" + response.razorpay_payment_id);
                    const sign = hmac.digest('hex');
                    if (sign === response.razorpay_signature) {
                        const transaction = new Transaction(
                            {
                                order_id: order._id,
                                amount: order.order_total,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                payment_status: 1
                            }
                        )
                        transaction.save()
                            .then(
                                () => {
                                    Order.updateOne(
                                        { _id: order._id },
                                        {
                                            order_status: 1,
                                            razorpay_payment_id: response.razorpay_payment_id,
                                            transaction_id: transaction._id
                                        }
                                    )

                                        .then(
                                            () => {

                                                //1st 

                                                // Cart.deleteMany({ user_id: order.user_id })
                                                //     .then(() => {
                                                //         //
                                                //         // console.log("orderCheck1",order)
                                                //         let productIds = [];
                                                //         let qtyDifference = [];
                                                //         for (const order_detail of order.order_details) {
                                                //             productIds.push(order_detail._id);
                                                //             qtyDifference.push(order_detail.quantity - order_detail.qty)
                                                //         }
                                                // console.log("productIds", productIds)
                                                // console.log("qty", qtyDifference)

                                                // try {
                                                //     for (let i = 0; i < productIds.length; i++) {
                                                //         Product.findByIdAndUpdate({ _id: productIds[i] }, { quantity: qtyDifference[i] },)
                                                //         .then((success) => {
                                                //             console.log(success)
                                                //             res({
                                                //                 msg: " changed",
                                                //                 status: 1
                                                //             })
                                                //         })
                                                //         .catch((err) => {
                                                //             console.log("err",err)
                                                //             rej({
                                                //                 msg: "Unable to changed",
                                                //                 status: 0
                                                //             })
                                                //         })
                                                //     }
                                                // } catch (error) {
                                                //     console.log('qtyChangeerror', error)
                                                // }

                                                //2nd

                                                const prodToUpdate = [];
                                                for (const order_detail of order.order_details) {
                                                    prodToUpdate.push({ _id: order_detail._id, quantity: order_detail.quantity - order_detail.qty })
                                                }
                                                const bulkOps = prodToUpdate.map((prod) => {
                                                    return {
                                                        updateOne: {
                                                            filter: { _id: prod._id },
                                                            update: { quantity: prod.quantity }
                                                        },

                                                    }
                                                })

                                                Product.bulkWrite(bulkOps)
                                                    .then((res) => {
                                                        Cart.deleteMany({})
                                                            .then(() => {

                                                            })
                                                            .catch((error) => {
                                                                // console.log("1", error)
                                                            })
                                                    }).catch(
                                                        () => {

                                                        }
                                                    )

                                                res(
                                                    {
                                                        msg: "Order successfully placed",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        ).catch(
                                            (error) => {
                                                // console.log("2", error)
                                                rej(
                                                    {
                                                        msg: "Internal server error",
                                                        status: 0
                                                    }
                                                )
                                            }
                                        )
                                }
                            ).catch(
                                (error) => {
                                    // console.log("3", error)
                                    rej(
                                        {
                                            msg: "Internal server error",
                                            status: 0
                                        }
                                    )
                                }
                            )

                    }
                    else {
                        rej(
                            {
                                msg: "Payment not verified",
                                status: 0
                            }
                        )
                    }
                }
                catch (error) {
                    // console.log("4", error)
                    rej(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    userOrders(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const orders = await Order.find({ user_id: user_id });
                    res(
                        {
                            msg: "Order find Successfully",
                            status: 1,
                            orders
                        }
                    )
                }
                catch (error) {
                    rej(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            })
    }
}
module.exports = OrderController;