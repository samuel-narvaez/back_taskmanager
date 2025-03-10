const { body, validationResult } = require("express-validator");

const authValidator = [
    body('email')
        .isEmail().withMessage('Email must be a valid email address')
        .isString().withMessage('Email must be a string')
        .notEmpty().withMessage('Email is required'),

    body('password')
        .notEmpty().withMessage('Password is required'),

    // Middleware para manejar errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { authValidator };
