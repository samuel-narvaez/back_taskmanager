const TaskModel = require('../../models/task/TaskModel.js')

taskService = {};
taskService.createService = async (params,idUser) => {
    const { title, description, completed, status, priority } = params;
    try {
        const task = new TaskModel({
            title,
            description,
            completed,
            status,
            priority,
            user: idUser.id
        });
        return await task.save();
    } catch (error) {
        console.log(error.message);
        throw new Error('Error saving task: ');
    }
}

taskService.getTasks = async (filter,idUser) => {
    const _id = idUser.id;
    try {
        const query = { user: _id };
        if (filter.completed !== undefined) {
            query.completed = filter.completed;
        }
        const tasks = await TaskModel.find(query);
        return tasks;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error fetching tasks');
    }
};

taskService.getTaskById = async (id) => {
    try {
        const task = await TaskModel.findById(id);
        return task;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error fetching task by ID');
    }
};

taskService.updateTaskById = async (id, updateData) => {
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        return updatedTask;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error updating task');
    }
};

taskService.deleteTaskById = async (id) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        return deletedTask;
    } catch (error) {
        console.log(error.message);
        throw new Error('Error deleting task');
    }
};

module.exports = taskService;