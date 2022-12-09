const token = require('jsonwebtoken')
const User = require('../models/User')

const checkAuth = (req, res, next) => {
  try {
    const jwt = req.headers.authorization?.split(' ')[1]
    const isVerify = token.verify(jwt, process.env.SECRET_KEY || '123456789')
    if (isVerify) {
      req.userId = isVerify._id
      return next()
    }
    return res.status(403).json({message: "Пользователь не авторизован"})
  } catch(e) {
    return next(e)
  }
}

const checkAccess = async (req, res, next) => {
  try {
    const {roles} = await User.findById(req.userId)
    if (roles.includes('ADMIN')) {
      return next()
    }
    return res.json({message: "У вас нет доступа"})
  } catch (e) {
    console.log(e)
    return res.json({message: "Что-то пошло не так!"})
  }
}

module.exports = {checkAuth, checkAccess}