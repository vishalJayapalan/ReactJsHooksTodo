const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  checked: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
  date: { type: String, default: 'false' },
  notes: { type: String, default: '' },
  listId: { type: mongoose.Schema.Types.ObjectId }
})

mongoose.model('Task', TaskSchema)
module.exports = TaskSchema
