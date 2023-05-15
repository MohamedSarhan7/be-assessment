
const mongoose = require('mongoose');


const checkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    protocol: {
        type: String,
        enum: ['HTTP', 'HTTPS', 'TCP'],
        required: true
    },
    path: {
        type: String,
    },
    port: {
        type: Number,
    },
    webhook: {
        type: String,
    },
    timeout: {
        type: Number,
        default: 5, // seconds
    },
    interval: {
        type: Number,
        default: 10, //minutes
    },
    threshold: {
        type: Number,
        default: 1, // 1 failure
    },
    authentication: {
        type: mongoose.Schema(
            {
                username: {
                    type: String
                },
                password: {
                    type: String
                }
            }
        )
    },
    httpHeaders: [
        {
            key: { type: String, },
            value: { type: String, }
        }
    ],
    assert: {
        statusCode: { type: String }
    },
    tags: [
        { type: String }
    ],
    ignoreSSL: {
        type: Boolean,
        required: true // not optional
    }


}, {
    timestamps: true
});

const model = mongoose.model('check', checkSchema);
module.exports = model;