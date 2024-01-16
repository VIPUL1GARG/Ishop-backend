const express = require('express');
const CategoryController = require('../Controllers/CategoryController');
const CategoryRouter = express.Router();
const fileupload = require('express-fileupload');

CategoryRouter.get(
    '/:id?',
    (req, res) => {
        const id = req.params.id;
        const result = new CategoryController().get(id);
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
CategoryRouter.post(
    "/create",
    fileupload(
        {
            createParentPath: true     //import
        }
    ),
    (req, res) => {
        const image = req.files.image;
        const result = new CategoryController().create(req.body, image);
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
CategoryRouter.delete(
    "/delete/:id?",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id);
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
CategoryRouter.get(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new CategoryController().changeStatus(req.params.id, req.params.new_status);
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
    }
)
CategoryRouter.patch(
    "/edit/:id",
    fileupload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const image = req.files?.image ?? null;    //its called null safe oprator
        const result = new CategoryController().edit(req.params.id, req.body, image);
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

module.exports = CategoryRouter;