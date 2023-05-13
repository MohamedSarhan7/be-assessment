const nodemailer = require('nodemailer');
const { SMTP_SERVER,
    SMTP_SERVER_PORT,
    SMTP_SERVER_EMAIL,
    SMTP_SERVER_PASS,
    HOSTNAME } = require('../config/config');


const sendEmail = (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_SERVER,
        port: SMTP_SERVER_PORT,
        auth: {
            user: SMTP_SERVER_EMAIL,
            pass: SMTP_SERVER_PASS,
        }
    });

    const mailOptions = {
        from: SMTP_SERVER_EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('Email sent: ' + info.response);
        return true;

    });
}

module.exports=sendEmail