const { body, validationResult } = require('express-validator');

const sanitizeUser = [
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('username').trim().escape().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { sanitizeUser };