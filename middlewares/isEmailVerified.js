const isEmailVerified = (req, res, next) => {
    
    if (!req.user.isEmailVerified) {
        return res.status(400).send("Ypur Email is  not verified yet");
    }
    return next();
};

module.exports = isEmailVerified;