const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
const validator = require('express-validator')
const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')


const signUp = async (req, res) => {
  const errors = validator.validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, password } = req.body
    const role = req.body.role || 'USER'
    const candidate = await User.findOne({ username })
    if (candidate) { return res.status(403).json({ message: 'Пользователь с таким именем уже существует' }) }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({ username, password: hash, roles: [role] })
    await fileService.createDir(new File({user: user._id, name: '', type: 'dir'}))
    await user.save()
    return res.json({ message: 'Вы успешно зарегистрировались!', id: user._id, role: user.roles })
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так', e })
  }
}

const signIn = async (req, res) => {
  const errors = validator.validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {username, password} = req.body
    const candidate = await User.findOne({username})
    if (candidate) {
      isRightPassword = bcrypt.hashSync(password, candidate.password)
      if (isRightPassword) {
        const jwt = token.sign({_id: candidate._id}, process.env.SECRET_KEY || '123456789')
        return res.json({message: 'Вы успешно авторизовались!', user: candidate, token: jwt, role: candidate.roles})
      }
    }
    return res.json({message: 'Пользователя с таким именем не существует!'})
  } catch(e) {
    console.log(e)
    return res.json({message: 'что-то пошло не так', e})
  }
}

const getUser = async (req, res) => {
  try {
    
    const user = await User.findById(req.userId)
    if (user) {
      return res.json({user})
    }
    return res.json({message: "Пользователь не найден!"})
  } catch(e) {
    console.log(e)
    return res.json({message: "Что-то пошло не так!"})
  }
}

module.exports = {
  signUp, signIn, getUser
}