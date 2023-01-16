const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const fileRouter = require('./routes/file')
const PORT  = process.env.PORT || 5001
const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(cors())



app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)
const start = async() => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/cloud')
    app.listen(PORT, () => {
      console.log('Server has been started on', PORT)
    })
  } catch(e) {
    console.log(e)
  }
}
start()