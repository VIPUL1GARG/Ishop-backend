const Category = require("../Models/Category");
const Product = require("../Models/Product")

class CategoryController {
    get(id = null) {
        return new Promise(
            async (res, rej) => {
                try {
                    let category = null;
                    if (id != null || id != undefined) {
                        category = await Category.find({ _id: id });
                    }
                    else {
                        category = await Category.find();
                    }
                    category = await Promise.all(
                        category.map(
                            async (cat) => {
                                const count = await Product.countDocuments({ category_id: cat._id })
                                return {
                                    ...cat.toJSON(), count
                                }
                            }
                        )
                    )
                    res(
                        {
                            msg: "Data found",
                            status: 1,
                            category,
                            baseUrl: "https://ishop-api-dc8a.onrender.com/uploads/category/"
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
    create(data, file) {
        return new Promise(
            (res, rej) => {
                try {
                    const allowedFiles = ["image/jpg", "image/jpeg", "image/svg"];
                    if (allowedFiles.includes(file.mimetype)) {
                        const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + file.name;
                        const destination = "./public/uploads/category/" + imageName;
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
                                    const category = new Category(data);
                                    category.save()
                                        .then(
                                            (success) => {
                                                res(
                                                    {
                                                        msg: "Category Added",
                                                        status: 1
                                                    }
                                                )
                                            }
                                        )
                                        .catch(
                                            () => {
                                                rej({
                                                    msg: "Unable to add category",
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
        return new Promise(
            (res, rej) => {
                try {
                    if (file !== null) {
                        const allowedFiles = ["image/jpg", "image/jpeg", "image/svg"];
                        if (allowedFiles.includes(file.mimetype)) {
                            const imageName = new Date().getTime() + Math.floor(Math.random() * 1000) + file.name;
                            const destination = "./public/uploads/category/" + imageName;
                            file.mv(
                                destination,
                                (err) => {
                                    if (!err) {
                                        Category.updateOne(
                                            { _id: id },
                                            {
                                                name: data.name,
                                                slug: data.slug,
                                                image: imageName
                                            }
                                        )
                                            .then(
                                                (success) => {
                                                    res(
                                                        {
                                                            msg: "Data update",
                                                            status: 1
                                                        }
                                                    )
                                                }
                                            )
                                            .catch(
                                                (error) => {
                                                    rej({
                                                        msg: "Unable to update data",
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
                        Category.updateOne(
                            { _id: id },
                            {
                                name: data.name,
                                slug: data.slug
                            }
                        )
                            .then(
                                (success) => {
                                    res(
                                        {
                                            msg: "Data update",
                                            status: 1
                                        }
                                    )
                                }
                            )
                            .catch(
                                (error) => {
                                    rej({
                                        msg: "Unable to update data",
                                        status: 0
                                    })
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
                    }
                }
            }
        )
    }
    delete(id) {
        return new Promise(
            (res, rej) => {
                try {
                    Category.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "category deleted",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Unable to delete the category",
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
    changeStatus(id, status) {
        return new Promise(
            (res, rej) => {
                try {
                    Category.updateOne(
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

}
module.exports = CategoryController;