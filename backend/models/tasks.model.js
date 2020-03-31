const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId },
  taskName: { type: String, required: true },
  checked: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  date: { type: String, default: 'false' },
  notes: { type: String },
  listId: { type: mongoose.Schema.Types.ObjectId }
})

mongoose.model('Task', TaskSchema)
module.exports = TaskSchema
