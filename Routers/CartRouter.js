const express = require('express');
const CartController = require('../Controllers/CartController');
const CartRouter = express.Router();

CartRouter.post(
    "/move-to-cart/:user_id",
    (req, res) => {
        const result = new CartController().moveToCart(req.params.user_id, req.body);
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
CartRouter.get(
    "/user-cart/:user_id",
    (req, res) => {
        const result = new CartController().userCart(req.params.user_id);
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
CartRouter.post(
    "/add-to-cart/:user_id",
    (req, res) => {
        const result = new CartController().userAddToCart(req.params.user_id, req.body);
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
CartRouter.get(
    "/change-qty/:user_id/:pId/:qty",
    (req, res) => {
        const result = new CartController().quantityChange(req.params.user_id, req.params.pId, req.params.qty);
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
CartRouter.delete(
    "/delete/:user_id/:pId",
    (req, res) => {
        const result = new CartController().removeUserCart(req.params.user_id, req.params.pId);
        result
            .then(
                (success) => {
                    res.send(success)
                }
            )
            .catch(
                (error) => {
                    res.send(error)
                }
            )
    });
module.exports = CartRouter;
