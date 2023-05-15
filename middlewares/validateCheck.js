const { body, check } = require('express-validator');

const validateName = () => body('name').isLength({ min: 3 })

const validateUrl = () => body('url').isURL()

const validateProtocol = () => body('protocol').isIn(['HTTP', 'HTTPS', 'TCP'])

const validatePath = () => body('path').optional().isString()

const validatePort = () => body('port').optional().isPort()

const validateWebhook = () => body('webhook').optional().isURL()

const validateTimeout = () => body('timeout').optional().isNumeric()

const validateInterval = () => body('interval').optional().isNumeric()

const validateThreshold = () => body('threshold').optional().isNumeric()

const validateAuthentication = () => check('authentication').optional()

const validateAuthenticationUsername = () => check("authentication.username").if(body("authentication").exists()).isString()
const validateAuthenticationPassword = () => check("authentication.password").if(body("authentication").exists()).isStrongPassword()

const validateHttpHeaders = () => body('httpHeaders').optional().isArray()
const validateAssert = () => body("assert").optional()
const validateAssertStatusCode = () => check("assert.statusCode").if(body("assert").exists()).isNumeric()



const validateTags = () => body('tags').optional().isArray()
const validateIgnoreSSL = () => body('ignoreSSL').isBoolean()

module.exports =
{
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
}