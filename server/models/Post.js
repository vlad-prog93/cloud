const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  watched: { type: Number }
},
  {
    timestamps: true
  })


module.exports = mongoose.model('Post', Post)