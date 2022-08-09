const { Task } = require('../models');

const taskController = {
    async listTasks(_, res) {
        const tasks = await Task.findAll(); // Récupérer la liste des tâches
        res.json(tasks); // Renvoyer la liste des tâches en json
    },

    async createTask(req, res) {
        const { name } = req.body;
        const task = await Task.create({ name });
        res.send(task);
    },

    async updateTask(req, res) {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (! task) {
            return res.status(404).json({ error: "Cannot find Task. Please verify the provided ID in the URL path."});
        }
        
        const { name } = req.body;
        task.set({ name });
        await task.save();
        res.json(task);
    },

    async deleteTask(req, res) {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (task) {
            await task.destroy();
        }
        res.status(204).end();
    }
};

module.exports = taskController;
