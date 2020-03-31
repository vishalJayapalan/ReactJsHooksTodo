const List = require('../models/lists.model')
const mongoose = require('mongoose')

const getAllTasks = (req, res) => {
  List.findById(req.params._id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err))
}

const createNewTask = (req, res) => {
  const task = req.body
  task.taskId = new mongoose.Types.ObjectId()
  List.findById(req.params._id).then(list => {
    list.tasks.push(task)
    list
      .save()
      .then(() => res.json({ taskId: task.taskId }))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

const updateTask = (req, res) => {
  List.findById(req.params._id).then(list => {
    list.tasks.id(req.body.task._id).set(req.body.task)
    list
      .save()
      .then(() => res.json(`task updated! ${list}`))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

const deleteTask = (req, res) => {
  List.findById(req.params._id).then(list => {
    const index = list.tasks.findIndex(task => task.taskId == req.params.taskId)
    if (index === -1) {
      return res.status(404).json({
        type: 'Error',
        message:
          'The list / task you are looking for is not available. Couldnot update task'
      })
    }
    list.tasks.splice(index, 1)
    list
      .save()
      .then(() => res.json(`task deleted! ${list}`))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask
}
