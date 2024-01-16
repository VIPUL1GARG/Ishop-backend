const Cart = require("../Models/Cart");


class CartController {
    moveToCart(user_id, data) {
        // console.log('1',user_id)
        return new Promise(
            (res, rej) => {
                try {
                    let flag = false;
                    // console.log('data',data)
                    for (const d of data) {
                        (async () => {
                            const cartData = await Cart.findOne({ user_id: user_id, pId: d.pId })
                            if (cartData !== null) {
                                Cart.updateOne(
                                    { _id: cartData._id },
                                    { qty: cartData.qty + d.qty }
                                ).then(
                                    () => {

                                    }
                                ).catch(
                                    () => {
                                        flag = true
                                    }
                                )
                            }
                            else {
                                const cart = new Cart({ user_id, ...d })
                                cart.save()
                                    .then(
                                        () => {

                                        }
                                    )
                                    .catch(

                                        () => {

                                            flag = true
                                        }
                                    )

                            }
                        })()
                    }
                    if (flag == true) {
                        rej(
                            {
                                msg: "unable to add product in cart",
                                status: 0
                            }
                        )
                    }
                    else {
                        res(
                            {
                                msg: "Product added in cart",
                                status: 1
                            }
                        )
                    }
                }
                catch (error) {
                    // console.log(error)
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
    userCart(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const userCart = await Cart.find({ user_id: user_id })
                    res({
                        userCart,
                        status: 1
                    })
                }
                catch (err) {
                    rej(
                        {
                            msg: 'Internal server error',
                            status: 0
                        }
                    )
                }
            }
        )
    }
    userAddToCart(user_id, data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const cartData = await Cart.findOne({ user_id: user_id, pId: data.pId })
                    if (cartData !== null) {
                        Cart.updateOne(
                            { _id: cartData._id },
                            { qty: cartData.qty + 1 }
                        ).then(
                            () => {
                                res(
                                    {
                                        msg: "Cart update",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to update cart",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }
                    else {
                        const cart = new Cart({ user_id, pId: data.pId, qty: 1 })
                        cart.save()
                            .then(
                                () => {
                                    res(
                                        {
                                            msg: "Added in cart",
                                            status: 1
                                        }
                                    )
                                }
                            ).catch(
                                () => {
                                    rej(
                                        {
                                            msg: "Unable to Add product in cart",
                                            status: 0
                                        }
                                    )
                                }
                            )

                    }
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
    quantityChange(user_id, pId, qty) {
        return new Promise(
            (res, rej) => {
                try {
                    Cart.updateOne({ user_id, pId }, { qty: qty })
                        .then(
                            () => {
                                res({
                                    msg: "Quantity changed",
                                    status: 1
                                })
                            }
                        ).catch(
                            () => {
                                rej({
                                    msg: "Unable to update quantity",
                                    status: 0
                                })
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
            }
        )
    }
    removeUserCart(user_id, pId) {
        return new Promise(
            (res, rej) => {
                try {
                    Cart.deleteOne({ user_id, pId })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Product deleted",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Unable to delete the product",
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (err) {
                    rej(
                        {
                            status: 0,
                            msg: "Internal server error"
                        }
                    )
                }
            }
        )
    }
}
module.exports = CartController;