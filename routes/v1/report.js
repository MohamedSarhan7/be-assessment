const reportRouter = require('express').Router();
const reportController = require('../../controllers/report')
const isAuthenticated = require("../../middlewares/isAuthenticated")
const isEmailVerified = require('../../middlewares/isEmailVerified');


reportRouter.get('/reports', isAuthenticated, isEmailVerified, reportController.getAllReports)
reportRouter.get('/reports/:id', isAuthenticated,isEmailVerified, reportController.getOneReport)
reportRouter.put('/reports/:id', isAuthenticated, isEmailVerified, reportController.updateReport)

module.exports = reportRouter