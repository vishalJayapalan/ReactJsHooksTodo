const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const listRoutes = require('./routes/list.routes')
const taskRoutes = require('./routes/task.routes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/list', listRoutes)
app.use('/task', taskRoutes)

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
