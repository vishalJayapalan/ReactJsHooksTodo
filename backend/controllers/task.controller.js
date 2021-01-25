const List = require('../models/lists.model')
// const mongoose = require('mongoose')

const getAllTasks = (req, res) => {
  List.findById(req.params._id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err))
}

const createNewTask = async (req, res) => {
  const task = req.body
  task.listId = req.params._id
  try {
    const list = await List.findById(req.params._id)
    list.tasks.push(task)
    await list.save()
    return res.json({ taskId: list.tasks[list.tasks.length - 1]._id })
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }
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
    const index = list.tasks.findIndex(task => task._id == req.params.taskId)
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
      .then(() => res.json({ list: list }))
      .catch(err => res.status(400).json('Error: ' + err))
  })
}

const clearCompletedTasks = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId)
    const tasks = list.tasks.filter(task => !task.checked)
    list.tasks = tasks
    await list.save()
    res.json('completedTasksDeleted!')
  } catch (err) {
    res.status(400).json('Error: ' + err)
  }
}

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
  clearCompletedTasks
}
