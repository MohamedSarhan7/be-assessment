const sendEmail = require('../services/sendEmail');

const reportModel = require('../models/report');



const getAllReports = async (req, res, next) => {
    try {
        const tag = req.query.tag;
        const query = { user: req.user.user_id, tags: { $in: [tag] } }
        const reports = await reportModel.find(query);

        if (!reports) {
            const error = new Error("you did't creat checks with this tag")
            error.status = 400;
            return next(error)
        }
        
        return res.status(200).json({ reports });

    } catch (err) {
        console.log(err);
    }
};

const getOneReport = async (req, res, next) => {
    try {
        const tag = req.query.tag;
        const query = { user: req.user.user_id, tags: { $in: [tag] } }
        const report = await reportModel.findOne(query);

        if (!report) {
            const error = new Error("you did't creat checks with this tag")
            error.status = 400;
            return next(error)
        }

        return res.status(200).json({ report });

    } catch (err) {
        console.log(err);
    }
};

const updateReport = async (req, res, next) => {
    try {
        const reportId = req.params.id;
        const query = { user: req.user.user_id, _id: reportId }
        let report = await reportModel.findById(query);
        
        if (!report){
            const error = new Error("you did't creat check with this id")
            error.status = 400;
            return next(error)
        }
        const updatedReport = await reportModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate(['user', 'check']);
        if(report.status!=req.body.status){
            const text = `${ updatedReport }`
            console.log(text)
            sendEmail(updatedReport.user.email, "URL Status Changed", JSON.stringify(updatedReport))
        }

        return res.status(201).json({ updatedReport });

    } catch (err) {
        console.log(err);
    }
};


module.exports = { updateReport, getAllReports, getOneReport };