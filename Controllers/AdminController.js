const Admin = require("../Models/Admin");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('vipul@garg');


class AdminController {
    // async createAccount(data) {
    //     return new Promise(
    //         async (res, rej) => {
    //             try {
    //                 const admin = await admin.findOne({ email: data.email })
    //                 if (admin !== null) {
    //                     rej(
    //                         {
    //                             msg: "Email Already Exists",
    //                             status: 0
    //                         }
    //                     )

    //                 }
    //                 else {
    //                     const adminAccount = new admin({
    //                         ...data,
    //                         password: cryptr.encrypt(data.password)
    //                     });
    //                     adminAccount.save()
    //                         .then(
    //                             () => {
    //                                 res(
    //                                     {
    //                                         msg: "Account Created Successfully",
    //                                         status: 1,
    //                                         adminAccount
    //                                     }
    //                                 )
    //                             }
    //                         ).catch(
    //                             () => {
    //                                 rej(
    //                                     {
    //                                         msg: "Unable To Create Account",
    //                                         status: 0
    //                                     }
    //                                 )
    //                             }
    //                         )
    //                 }
    //             }
    //             catch (error) {
    //                 rej(
    //                     {
    //                         msg: "Internal Server Error",
    //                         status: 0
    //                     }
    //                 )
    //             }
    //         }
    //     )
    // }

    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const admin = await Admin.findOne({ email: data.email })
                    if (admin != null) {
                        if (cryptr.decrypt(admin.password) == data.password) {
                            res(
                                {
                                    admin: {
                                        id: admin._id,
                                        name: admin.name,
                                        email: admin.email
                                    },
                                    msg: "Login Successful",
                                    status: 1,
                                }
                            )
                        }
                        else {
                            rej(
                                {
                                    msg: "Invalid Details",
                                    status: 0
                                }
                            )
                        }
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
}
module.exports = AdminController;