const { body, validationResult } = require("express-validator");

const validateTask = [
    body("title")
        .notEmpty()
        .withMessage("Title is required!")
        .bail()
        .isString()
        .withMessage("Title must be a string")
        .trim(),

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
    validateTask,
};
