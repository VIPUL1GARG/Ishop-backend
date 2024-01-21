const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Color = require("../Models/Color");
class ProductController {
    get(id = null) {
        return new Promise(
            async (res, rej) => {
                try {
                    let product = null;
                    if (id != null || id != undefined) {
                        product = await Product.find({ _id: id });
                    }
                    else {
                        product = await Product.find();
                    }
                    product = await Promise.all(
                        product.map(
                            async (data) => {
                                const catData = await Category.findById(data.category_id);
                                const colorData = await Color.findById(data.color_id);
                                return {
                                    ...data?.toJSON(),
                                    catData: catData?.toJSON(),
                                    colorData: colorData?.toJSON(),
                                }
                            }
                        )
                    )
                    res(
                        {
                            msg: "Data found",
                            status: 1,
                            product,
                            baseUrl: "https://ishop-api-dc8a.onrender.com/uploads/product/"
                        }
                    )
                }
                catch (error) {
                    // console.log(error)
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
    create(data, file) {
        return new Promise(
            (res, rej) => {
                try {
                    const allowedFiles = ["image/jpg", "image/jpeg", "image/svg"];
                    if (allowedFiles.includes(file.mimetype)) {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + file.name;
                        const destination = "./public/uploads/product/" + imageName;
                        file.mv(
                            destination,
                            (err) => {
                                if (err) {
                                    rej(
                                        {
                                            msg: "Unable to upload file",
                                            status: 0
                                        }
                                    )
                                }
                                else {
                                    data.image = imageName;
                                    const product = new Product(data);
                                    product.save()
                                        .then(
                                            (success) => {
                                                res(
                                                    {
                                                        msg: "Product Added",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        )
                                        .catch(
                                            (error) => {
                                                // console.log(error)
                                                rej({
                                                    msg: "Unable to add Product",
                                                    status: 0
                                                })
                                            }
                                        )
                                }
                            }

                        )
                    }
                    else {
                        rej(
                            {
                                msg: "Please upload Valid Image",
                                status: 0
                            }
                        )
                    }
                } catch {
                    (err) => {
                        rej(
                            {
                                msg: "Internal server error",
                                status: 0
                            }
                        )
                        // console.log(err)
                    }
                }
            }
        )
    }
    edit(id, data, file) {
        // console.log("kuch",data)
        return new Promise(
            (res, rej) => {
                try {
                    if (file !== null) {
                        const allowedFiles = ["image/jpg", "image/jpeg", "image/svg"];
                        if (allowedFiles.includes(file.mimetype)) {
                            const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + file.name;
                            const destination = "./public/uploads/product/" + imageName;
                            file.mv(
                                destination,
                                (err) => {
                                    if (!err) {
                                        Product.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                                slug: data.slug,
                                                image: imageName,
                                                // category_id:ObjectId(category_id),
                                                price: Number(data.price),
                                                discount: Number(data.discount),
                                                finalPrice: Number(data.finalPrice),
                                                quantity: Number(data.quantity)
                                            }
                                        )
                                            .then(
                                                (success) => {
                                                    res(
                                                        {
                                                            msg: "Data update1",
                                                            status: 1
                                                        }
                                                    )
                                                },
                                                // ()=>{console.log("vipul",ObjectId(data.category_id))}
                                            )
                                            .catch(
                                                (error) => {
                                                    rej({
                                                        msg: "Unable to update data1",
                                                        status: 0
                                                    })
                                                }
                                            )
                                    }

                                }

                            )
                        }
                        else {
                            rej(
                                {
                                    msg: "Please upload Valid Image",
                                    status: 0
                                }
                            )
                        }
                    }
                    else {
                        Product.updateOne(
                            { _id: id },
                            {
                                name: data.name,
                                slug: data.slug,
                                price: Number(data.price),
                                discount: Number(data.discount),
                                finalPrice: Number(data.finalPrice),
                                quantity: Number(data.quantity)
                            }
                        )
                            .then(
                                (success) => {
                                    // console.log("vipul",new ObjectId(data.category_id));
                                    res(
                                        {
                                            msg: "Data update2",
                                            status: 1
                                        }
                                    )
                                },

                            )
                            .catch(
                                (error) => {
                                    // console.log("vipul", new ObjectId(data.category_id));
                                    rej({
                                        msg: "Unable to update data2",
                                        status: 0
                                    })
                                },

                            )
                    }
                } catch {
                    (err) => {
                        rej(
                            {
                                msg: "Internal server error",
                                status: 0
                            }
                        )
                    }
                }
            }
        )
    }
    sellerStatus(id, best_seller) {
        return new Promise(
            (res, rej) => {
                try {
                    Product.updateOne(
                        { _id: id },
                        { best_seller }
                    )
                        .then(
                            () => {
                                res(
                                    {
                                        msg: "status changed",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to change status",
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (err) {
                    rej(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            })
    }
    changeStatus(id, status) {
        return new Promise(
            (res, rej) => {
                try {
                    Product.updateOne(
                        { _id: id },
                        { status }
                    )
                        .then(
                            () => {
                                res(
                                    {
                                        msg: "status changed",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            () => {
                                rej(
                                    {
                                        msg: "Unable to change status",
                                        status: 0
                                    }
                                )
                            }
                        )
                }
                catch (err) {
                    rej(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            })
    }
    delete(id) {
        return new Promise(
            (res, rej) => {
                try {
                    Product.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "product deleted",
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
module.exports = ProductController;