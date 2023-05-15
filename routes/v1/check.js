const checkRouter = require('express').Router();
const checkController = require('../../controllers/check')
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isEmailVerified = require('../../middlewares/isEmailVerified');

const {
    validateName,
    validateUrl,
    validateProtocol,
    validatePath,
    validatePort,
    validateWebhook,
    validateTimeout,
    validateInterval,
    validateThreshold,
    validateAuthentication,
    validateAuthenticationUsername,
    validateAuthenticationPassword,
    validateHttpHeaders,
    validateAssert,
    validateAssertStatusCode,
    validateTags,
    validateIgnoreSSL,
} = require('../../middlewares/validateCheck');

checkRouter.get('/checks', isAuthenticated, checkController.getAllChacks)
checkRouter.get('/checks/:id', isAuthenticated, checkController.getOneCheck)

checkRouter.delete('/checks/:id', isAuthenticated, checkController.deleteOneCheck)

checkRouter.post('/checks',
    isAuthenticated,
    isEmailVerified,
    [
        validateName(),
        validateUrl(),
        validateProtocol(),
        validatePath(),
        validatePort(),
        validateWebhook(),
        validateTimeout(),
        validateInterval(),
        validateThreshold(),
        validateAuthentication(),
        validateAuthenticationUsername(),
        validateAuthenticationPassword(),
        validateHttpHeaders(),
        validateAssert(),
        validateAssertStatusCode(),
        validateTags(),
        validateIgnoreSSL(),
    ],
    checkController.createCheck)

checkRouter.put('/checks/:id',
    isAuthenticated,
    isEmailVerified,
    [
        validateName(),
        validateUrl(),
        validateProtocol(),
        validatePath(),
        validatePort(),
        validateWebhook(),
        validateTimeout(),
        validateInterval(),
        validateThreshold(),
        validateAuthentication(),
        validateAuthenticationUsername(),
        validateAuthenticationPassword(),
        validateHttpHeaders(),
        validateAssert(),
        validateAssertStatusCode(),
        validateTags(),
        validateIgnoreSSL(),
    ],
    checkController.updateCheck)


module.exports = checkRouter