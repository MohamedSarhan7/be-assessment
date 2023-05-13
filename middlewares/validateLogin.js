const { body } = require('express-validator');

const validateEmailLogin = () => body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }).trim();

const validatePasswordLogin = () =>
    body('password')
        .isStrongPassword();



module.exports =
{
    validateEmailLogin,
    validatePasswordLogin,
}




























// =========================================================
//          default options for isStrongPassword
// =========================================================
// body('password').isStrongPassword({
//     minLength: 8,
//     minLowercase: 1,
//     minUppercase: 1,
//     minNumbers: 1,
//     minSymbols: 1,
//     returnScore: false,
//     pointsPerUnique: 1,
//     pointsPerRepeat: 0.5,
//     pointsForContainingLower: 10,
//     pointsForContainingUpper: 10,
//     pointsForContainingNumber: 10,
//     pointsForContainingSymbol: 10,
// })