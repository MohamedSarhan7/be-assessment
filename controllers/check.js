
const { validationResult } = require('express-validator');

// const userModel = require('../models/user');
const reportModel = require('../models/report');
const checkModel = require('../models/check');


const createCheck = async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = new Error()
            error.status = 400;
            error.array = result.array();
            return next(error)
        }

        const check = await checkModel.create({ user: req.user.user_id, ...req.body });
        await reportModel.create({user:req.user.user_id,check:check._id})
        return res.status(201).json({ check });

    } catch (err) {
        console.log(err);
    }
};

const updateCheck = async (req, res, next) => {
    try {
        // console.log(req.user)
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = new Error()
            error.status = 400;
            error.array = result.array();
            return next(error)
        }
        const checkId = req.params.id;
        const query = { user: req.user.user_id, _id: checkId }
        
        const updatedCheck = {
            name: req.body.name,
            url: req.body.url,
            protocol: req.body.protocol,
            path: req.body.path || null,
            port: req.body.port || null,
            webhook: req.body.webhook || null,
            authentication: req.body.authentication||null,
            httpHeaders: req.body.httpHeaders||null,
            assert: req.body.assert || null,
            tags: req.body.tags || null,
            ignoreSSL: req.body.ignoreSSL,

        }

        // const check = await checkModel.findOneAndReplace(query, { ...req.body, user: req.user.user_id }, { new: true })
        // const check = await checkModel.findOneAndUpdate(query, updateCheck, { new: true })

        const check = await checkModel.findOneAndUpdate(query, { $set: { ...updatedCheck }}, { new: true })
        if (!check) {
            const error = new Error("you did't creat check with this id")
            error.status = 400;
            return next(error)
        }

        return res.status(200).send({ check });
    } catch (err) {
        console.log(err);
    }

};

const getAllChacks = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const tag = req.query.tag ;

        let query = { user: req.user.user_id }
        if (tag){
            query = { user: req.user.user_id, tags: { $in: [tag] } }
        }

        const checks = await checkModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalDocs = await checkModel.count(query);
        const totalPages = Math.ceil(totalDocs / limit)
        return res.status(200).send({ totalDocs, totalPages, checks, });
    } catch (error) {
        console.log(error)
    }

}

const getOneCheck = async (req, res, next) => {
    try {
        const checkId = req.params.id;
        const query = { user: req.user.user_id, _id: checkId }
        const check = await checkModel.findOne(query)
        if (!check) {
            const error = new Error("you did't creat check with this id")
            error.status = 400;
            return next(error)
        }

        return res.status(200).send({ check });
    } catch (error) {
        console.log(error)
    }

}


const deleteOneCheck = async (req, res, next) => {
    try {
        const checkId = req.params.id;
        const query = { user: req.user.user_id, _id: checkId }
        const deletedCheck = await checkModel.findOneAndRemove(query)
        if (!deletedCheck) {
            const error = new Error("you did't creat check with this id")
            error.status = 400;
            return next(error)
        }

        return res.status(200).send({ deletedCheck,message:"check Deleted" });
    } catch (error) {
        console.log(error)
    }

}
module.exports = { createCheck, updateCheck, getAllChacks, getOneCheck,deleteOneCheck };