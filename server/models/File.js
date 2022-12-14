const mongoose = require('mongoose')

const File = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  user: {type: mongoose.Types.ObjectId, ref: 'User'},
  parent: {type: mongoose.Types.ObjectId, ref: 'File'},
  childs: [{type: mongoose.Types.ObjectId, ref: 'File'}],
  date: {type: Date, default: Date.now()}
})


module.exports = mongoose.model('File', File)