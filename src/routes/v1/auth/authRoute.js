const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/auth').authController
const { authValidator } = require("../../../validators/authValidator");

router
    .post("/login", authValidator, authController.login)

module.exports = router;