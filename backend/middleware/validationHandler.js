const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        next();
    }
}

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You don't have access");
    }
    next();
}

module.exports = { handleValidationErrors, isAuthenticated };