const { body, validationResult } = require("express-validator");

const validateUser = [
    body('name')
        .isString().withMessage('User must be a string')
        .isLength({ max: 20 }).withMessage('User must not exceed 20 characters')
        .notEmpty().withMessage('User is required'),

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

module.exports = {
    validateUser,
};
