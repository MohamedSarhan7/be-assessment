const mongoose = require('mongoose');
const DB_URL=require('../config/config').DB_URL;

function db() {
    try {
        mongoose.connect(DB_URL);
        console.log(`DB Connectioned: ${DB_URL}`);
    } catch (error) {
        console.log("ERROR in DB connection: ", error)

    }
}
module.exports = db;