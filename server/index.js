const express = require('express')
const res = require('express/lib/response')
require('dotenv').config()
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const PORT  = process.env.PORT || 5001
const app = express()

app.use(express.json())




app.use('/api/auth', auth)
const start = async() => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/test1')
    app.listen(PORT, () => {
      console.log('Server has been started on', PORT)
    })
  } catch(e) {
    console.log(e)
  }
}
start()