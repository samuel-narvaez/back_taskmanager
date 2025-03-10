const express = require('express');
const router = express.Router();
const taskController = require('../../../controllers/task').taskController
const authMiddleware = require('../../../middleware/authentication');
const { validateTask } = require("../../../validators/taskValidator");

router
    .post("/", authMiddleware, validateTask, taskController.create)
    .get("/", authMiddleware, taskController.getTasks)
    .get("/:id", taskController.getTaskById)
    .put('/:id', validateTask, taskController.updateTaskById)
    .delete('/:id', taskController.deleteTaskById)

module.exports = router;