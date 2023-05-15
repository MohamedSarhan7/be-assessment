
const mongoose = require('mongoose');
const sendEmail=require('../services/sendEmail');

const reportSchema = mongoose.Schema({
    check: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "check",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: Number,
        enum: [1, 0],
        default: 1,
        required: true
    },
    availability: {
        type: Number,
        required: true,
        default: 0
    },
    outages: {
        type: Number,
        required: true,
        default: 0
    },
    downtime: {
        type: Number,
        required: true,
        default: 0
    },
    uptime: {
        type: Number,
        required: true,
        default: 0
    },
    responseTime: {
        type: Number,
        required: true,
        default: 0
    },
    history: [{ type: Date }],
},
    {
        timestamps: true
    });

  
const model = mongoose.model('report', reportSchema);
module.exports = model;