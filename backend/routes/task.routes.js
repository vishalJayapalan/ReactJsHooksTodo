const express = require('express')
const Router = express.Router()

const taskController = require('../controllers/task.controller.js')

Router.get('/:_id', taskController.getAllTasks)

Router.post('/:_id', taskController.createNewTask)

Router.put('/:_id/:taskId', taskController.updateTask)

Router.delete('/:_id/:taskId', taskController.deleteTask)

// Router.delete(
//   '/:listId/clearCompletedTasks/',
//   taskController.clearCompletedTasks
// )

module.exports = Router
