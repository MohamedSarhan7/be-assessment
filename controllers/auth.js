
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const signAccessToken = require("../services/signAccessToken");
const sendEmail = require('../services/sendEmail');


const userModel = require('../models/user');


const register = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = new Error()
            error.status = 400;
            error.array = result.array();
            return next(error)
        }

        const { fullname, email, password1 } = req.body;

        encryptedPassword = await bcrypt.hash(password1, 10);
        encryptedVerificationCode = await bcrypt.hash(email, 10);

        const newuser = {
            fullname: fullname,
            email: email,
            password: encryptedPassword,
            isEmailVerified: false,
            verificationCode: encryptedVerificationCode
        }

        const user = await userModel.create(newuser);
        const token = signAccessToken(user);
        sendEmail(user.email, "Email verification", `Your Email Verification Code is ${user.verificationCode}`)
        return res.status(201).json({ user: user, token: token });

    } catch (err) {
        console.log(err);
    }
};

// Login
const login = ("/login", async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = new Error()
            error.status = 400;
            error.array = result.array();
            return next(error)
        }
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = signAccessToken(user)

            return res.status(200).json({ user: user, token: token });
        }
        const error = new Error("Invalid Credentials")
        error.status = 400;
        return next(error)
    } catch (err) {
        console.log(err);
    }

});

const verifyEmail = async (req, res, next) => {
    try {

        const user = await userModel.findById(req.user.user_id);
        if (user && await bcrypt.compare( user.email,req.body.verificationCode)) {
            user.isEmailVerified = true;
            user.save();
            return res.status(200).send({ user: user, "message": "Email verified successfully" });
        }
        const error = new Error("somthing went wrong Or user not found")
        error.status = 400;
        return next(error)

    } catch (error) {
        console.log(error)
    }

}

module.exports = { register, login, verifyEmail };