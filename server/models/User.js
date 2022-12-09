const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: mongoose.Types.ObjectId, ref: 'File'}],
    roles: [{type: String}],
  }
)

module.exports = mongoose.model('User', User)
