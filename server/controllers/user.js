const fs = require('fs')
const {rmdir} = require('fs/promises')
const path = require('path')
const User = require("../models/User")

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.json(users)
  } catch (e) {
    console.log(e)
    return res.json({message: "Что-то пошло не так!"})
  }
}

const deleteUser = async (req, res) => {
  try {
    const {username} = req.params
    const user = await User.findOne({username})
    if (user) {
      try {
        const pathDir = path.join(__dirname, '../' ,'/files',`/${user._id}`)
        await rmdir(pathDir, { recursive: true })
        user.deleteOne()
      }
      catch(e) {
        return res.status(400).json({message: 'Не удалось удалить пользователя'})
      }
      return res.json({message: "Пользователь успешно удален", user})
    }
    return res.json({message: "Пользователь не найден"})
  } catch(e) {
    console.log(e)
    return res.json({message: "Что-то пошло не так!"})
  }
}

module.exports = {
  getUsers, deleteUser
}