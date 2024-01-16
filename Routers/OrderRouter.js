const express = require('express');
const OrderController = require('../Controllers/OrderController');
const OrderRouter = express.Router();

OrderRouter.post(
    "/place-order",
    (req, res) => {
        const result = new OrderController().placeOrder(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
);
OrderRouter.post(
    "/order-success",
    (req, res) => {
        const response = new OrderController().orderSuccess(req.body);
    //   console.log(req.body)
        response.then(
            (success) => {
                // console.log("orderCheckRouter",req.body)
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)
OrderRouter.get(
    "/user-orders/:user_id",
    (req, res) => {
        const response = new OrderController().userOrders(req.params.user_id);
        response.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )
    }
)

module.exports = OrderRouter;
