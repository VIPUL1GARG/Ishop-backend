const express = require('express');
const UserController = require('../Controllers/UserController');
const UserRouter = express.Router();

UserRouter.post(
    "/create-account",
    (req, res) => {
        const result = new UserController().createAccount(req.body);
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
UserRouter.post(
    "/login",
    (req, res) => {
        const result = new UserController().login(req.body);
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

UserRouter.patch(
    "/update-profile/:user_id",
    (req, res) => {
        const result = new UserController().updateProfile(req.params.user_id, req.body);
        // console.log("router",req.body)

        result.then(
            (success) => {
                // console.log("success",success)
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

UserRouter.get(
    "/send-otp/:email",
    (req, res) => {
        const result = new UserController().sendOtp(req.params.email);
        result.then(
            (success) => {
                // console.log("success",success)
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
UserRouter.get(
    "/verify-otp/:email/:otp",
    (req, res) => {
        const result = new UserController().verifyOtp(req.params.email, req.params.otp);
        // console.log('123',req.params.email)
        result.then(
            (success) => {
                // console.log("success",success)
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)

UserRouter.patch(
    "/forgot-password/change-password/:email",
    (req, res) => {
        const result = new UserController().changePassword(req.params.email, req.body);
        // console.log("router",req.body)

        result.then(
            (success) => {
                // console.log("success",success)
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
UserRouter.patch(
    "/update-password/:email",
    (req, res) => {
        const result = new UserController().updatePassword(req.params.email, req.body);
        // console.log("router",req.body, req.params.email)
        result.then(
            (success) => {
                // console.log("success",success)
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
module.exports = UserRouter;