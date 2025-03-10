const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/auth').userController
const { validateUser } = require("../../../validators/userValidator");

router
    .post("/",validateUser, userController.create)
    
module.exports = router;