const jwt = require("jsonwebtoken");
const TOKEN_KEY=require('../config/config').TOKEN_KEY;

const auth = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token,TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = auth;