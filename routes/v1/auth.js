const authRouter = require('express').Router();
const authController = require('../../controllers/auth')
const isAuthenticated = require("../../middlewares/isAuthenticated")

const {
    validateEmail,
    validateFullName,
    validatePassword1,
    validatePassword2
} = require('../../middlewares/validateRegister');

const {
    validateEmailLogin,
    validatePasswordLogin

} = require('../../middlewares/validateLogin');
authRouter.post('/auth/register',
    [
        validateFullName(),
        validateEmail(),
        validatePassword1(),
        validatePassword2(),
    ],
    authController.register)




authRouter.post('/auth/login',
    [
        validateEmailLogin(),
        validatePasswordLogin()
    ],
    authController.login)

authRouter.post('/auth/verify-email', isAuthenticated, authController.verifyEmail)


module.exports = authRouter