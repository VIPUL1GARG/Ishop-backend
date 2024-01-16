const express = require('express');
const ProductController = require('../Controllers/ProductController');
const ProductRouter = express.Router();
const fileupload = require('express-fileupload');

ProductRouter.get(
    '/:id?',
    (req, res) => {
        const id = req.params.id;
        const result = new ProductController().get(id);
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
ProductRouter.post(
    "/create",
    fileupload(
        {
            createParentPath: true     //import
        }
    ),
    (req, res) => {
        const image = req.files.image;
        const result = new ProductController().create(req.body, image);
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
ProductRouter.delete(
    "/delete/:id?",
    (req, res) => {
        const result = new ProductController().delete(req.params.id);
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
ProductRouter.get(
    "/seller-status/:id/:new_status",
    (req, res) => {
        const result = new ProductController().sellerStatus(req.params.id, req.params.new_status);
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
ProductRouter.get(
    "/change-status/:id/:new_status",
    (req, res) => {
        const result = new ProductController().changeStatus(req.params.id, req.params.new_status);
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
ProductRouter.patch(
    "/edit/:id",
    fileupload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const image = req.files?.image ?? null;
        const result = new ProductController().edit(req.params.id, req.body, image);

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

module.exports = ProductRouter;