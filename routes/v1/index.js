const v1Router = require('express').Router();
const authRouter = require('./auth')



// v1Router.use('/', userRouter)
v1Router.use('/', authRouter)

module.exports = v1Router
