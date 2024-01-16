const express = require('express');
const AdminController = require('../Controllers/AdminController');
const AdminRouter = express.Router();

// AdminRouter.post(
//     "/create-account",
//     (req, res) => {
//         const result = new AdminController().createAccount(req.body);
//         result.then(
//             (success) => {
//                 res.send(success);
//             }
//         ).catch(
//             (error) => {
//                 res.send(error);
//             }
//         )
//     }
// );
AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().login(req.body);
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


module.exports = AdminRouter;