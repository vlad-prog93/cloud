const User = require("../models/User")

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    return res.json({...users})
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
      user.deleteOne()
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