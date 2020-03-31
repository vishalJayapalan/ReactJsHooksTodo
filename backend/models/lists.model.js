const mongoose = require('mongoose')
const TaskSchema = require('./tasks.model')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  listName: { type: String, required: true },
  tasks: [TaskSchema]
})

module.exports = mongoose.model('List', ListSchema)
