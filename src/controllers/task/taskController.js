const taskService = require('../../services/task').taskService;
taskController = {};

taskController.create = async (req, res) => {
    try {
        const userId = req.id
        const task = await taskService.createService(req.body,userId);
        res.status(201).json({ status: "success", task });
    } catch (error) {
        console.error("Error in createTask: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

taskController.getTasks = async (req, res) => {
    try {
        const { completed } = req.query;
        const userId = req.id
        const filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }
        const tasks = await taskService.getTasks(filter,userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await taskService.updateTaskById(id, req.body);

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskService.deleteTaskById(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task successfully deleted', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = taskController;