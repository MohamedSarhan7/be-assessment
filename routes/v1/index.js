const v1Router = require('express').Router();
const authRouter = require('./auth')
const checkRouter = require('./check')
const reportRouter = require('./report')



v1Router.use('/', authRouter)
v1Router.use('/', checkRouter)
v1Router.use('/', reportRouter)

module.exports = v1Router
