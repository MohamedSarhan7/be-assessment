require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const TOKEN_KEY = process.env.TOKEN_KEY;
const SMTP_SERVER = process.env.SMTP_SERVER;
const SMTP_SERVER_PORT = process.env.SMTP_SERVER_PORT;
const SMTP_SERVER_EMAIL = process.env.SMTP_SERVER_EMAIL;
const SMTP_SERVER_PASS = process.env.SMTP_SERVER_PASS;
const HOSTNAME = process.env.HOSTNAME

module.exports={
    DB_URL,
    PORT,
    TOKEN_KEY,
    HOSTNAME,
    SMTP_SERVER,
    SMTP_SERVER_PORT,
    SMTP_SERVER_EMAIL,
    SMTP_SERVER_PASS,
}