const User = require("../Models/User");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('vipul@garg');
const { generateOTP } = require("../helper")
const nodemailer = require("nodemailer");

class UserController {
    async createAccount(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: data.email })
                    if (user !== null) {
                        rej(
                            {
                                msg: "Email Already Exists",
                                status: 0
                            }
                        )

                    }
                    else {
                        const userAccount = new User({
                            ...data,
                            password: cryptr.encrypt(data.password)
                        });
                        userAccount.save()
                            .then(
                                () => {
                                    res(
                                        {
                                            msg: "Account Created Successfully",
                                            status: 1,
                                            userAccount
                                        }
                                    )
                                }
                            ).catch(
                                () => {
                                    rej(
                                        {
                                            msg: "Unable To Create Account",
                                            status: 0
                                        }
                                    )
                                }
                            )
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
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: data.email })
                    if (user != null) {
                        if (cryptr.decrypt(user.password) == data.password) {
                            res(
                                {
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        contact: user.contact,
                                        address: user.address
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
    updateProfile(user_id, data) {
        return new Promise(
            (res, rej) => {
                // console.log("updateProfile", data)
                try {
                    User.findOneAndUpdate(
                        {
                            _id: user_id
                        }, {
                        name: data.name,
                        email: data.email,
                        address: data.address ?? null,
                        contact: data.contact ?? null
                    }
                    ).then(() => {
                        // console.log("success update", data)
                        res({
                            msg: "Profile updated",
                            status: 1
                        })
                    })
                        .catch(() => {
                            rej({
                                msg: "Unable to update Profile",
                                status: 0
                            })
                        })
                } catch (error) {
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
    sendOtp(email) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = User.findOne({ email: email });
                    if (user !== null) {
                        const otp = generateOTP()
                        // console.log(otp);
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                                user: "ishop01011996@gmail.com",
                                pass: "Ishop1996",
                            },
                        })
                        var mailOptions = {
                            from: 'ishop01011996@gmail.com',
                            to: email,
                            subject: 'OTP for forgot password',
                            text: `Your OTP is ${otp}`
                        }
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                // console.log(error);

                                // y else me use hoga
                                User.updateOne({ email: email }, { forgot_password_otp: otp })
                                    .then(() => {

                                    }).catch(() => {

                                    })
                                // ..
                                rej({
                                    msg: "Unable to send OTP",
                                    status: 0
                                })
                            } else {
                                // console.log('Email sent: ' + info.response);
                                //yha pr
                                res({
                                    msg: "otp sand ",
                                    status: 1,
                                    otp
                                })
                            }
                        });

                    } else {
                        rej({
                            msg: "Invaild email",
                            status: 0
                        })
                    }
                }
                catch (error) {
                    // console.log("in", error)
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    verifyOtp(email, otp) {
        return new Promise(
            (res, rej) => {
                try {
                    // console.log(email)
                    User.findOne({ email: email }, "forgot_password_otp").then(
                        (x) => {
                            let forgot_password_otp = 0
                            forgot_password_otp = x.forgot_password_otp
                            if (forgot_password_otp) {
                                // console.log("forgot_password_otp",typeof forgot_password_otp)
                                // console.log("otp", typeof otp)
                                if (forgot_password_otp === Number(otp)) {
                                    res({
                                        msg: "OTP verified",
                                        status: 1
                                    })
                                } else {
                                    // console.log("123")
                                    rej({
                                        msg: "Invalid OTP",
                                        status: 0
                                    })
                                }
                            } else {
                                rej({
                                    msg: "OTP Not Found",
                                    status: 0
                                })
                            }


                        }
                    )
                        .catch(
                            (err) => {

                                // console.log(err)
                            }
                        )

                }
                catch (error) {
                    // console.log("in", error)
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    changePassword(email, data) {
        return new Promise(
            (res, rej) => {
                // console.log("updateProfile", data)
                try {
                    User.findOneAndUpdate(
                        {
                            email: email
                        }, {
                        password: cryptr.encrypt(data.password)
                    }
                    ).then(() => {
                        // console.log("email",email)
                        // console.log("success update", data.password)
                        res({
                            msg: "Password changed",
                            status: 1
                        })
                    })
                        .catch((err) => {
                            rej({
                                msg: "Unable to changed Password",
                                status: 0
                            })
                        })
                } catch (error) {
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
    updatePassword(email, data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: email })
                    if (user != null) {
                        const prevPassword = cryptr.decrypt(user.password)
                        if (prevPassword === data.currentPassword) {
                            const newPassword = cryptr.encrypt(data.password)
                            user.password = newPassword
                            await user.save()

                            res(
                                {
                                    msg: "Password updated",
                                    status: 1
                                }
                            )
                        }
                        else {
                            rej(
                                {
                                    msg: "Wrong password",
                                    status: 0
                                }
                            )
                        }
                    }
                    else {
                        rej(
                            {
                                msg: "User not found",
                                status: 0
                            }
                        )
                    }
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
                // console.log("updateProfile", data)
            }
        )
    }
}

module.exports = UserController;