
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    isEmailVerified: { type: Boolean, default: false, },
    verificationCode: { type: String,  },
}, {
    timestamps: true
});

const model = mongoose.model('user', userSchema);
module.exports = model;