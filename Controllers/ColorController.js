const Color = require("../Models/Color");
const Product = require("../Models/Product")

class ColorController {

    get(id = null) {
        return new Promise(
            async (res, rej) => {
                try {
                    let color = null;
                    if (id != null || id != undefined) {
                        color = await Color.find({ _id: id });
                    }
                    else {
                        color = await Color.find();
                    }
                    color = await Promise.all(
                        color.map(
                            async (c) => {
                                const count = await Product.countDocuments({ color_id: c._id })
                                return {
                                    ...c.toJSON(), count
                                }
                            }
                        )
                    )
                    res(
                        {
                            msg: "Data found",
                            status: 1,
                            color,
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
    create(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const color = new Color(data);
                    color.save()
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "Color Added",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            () => {
                                rej({
                                    msg: "Unable to add color",
                                    status: 0
                                })
                            }
                        )

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
    edit(id, data) {
        return new Promise(
            (res, rej) => {
                try {
                    Color.updateOne(
                        { _id: id },
                        {
                            name: data.name,
                            slug: data.slug,
                            code: data.code
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
                catch {
                    (err) => {
                        rej(
                            {
                                msg: "Internal server eroor",
                                status: 0
                            }
                        )
                    }
                }
            }
        )
    }
    changeStatus(id, status) {
        return new Promise(
            (res, rej) => {
                try {
                    Color.updateOne(
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
                    Color.deleteOne({ _id: id })
                        .then(
                            (success) => {
                                res(
                                    {
                                        msg: "color deleted",
                                        status: 1
                                    }
                                )
                            }
                        )
                        .catch(
                            (error) => {
                                rej(
                                    {
                                        msg: "Unable to delete the color",
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
module.exports = ColorController;