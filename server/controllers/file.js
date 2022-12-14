const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')

const createDir = async (req, res) => {
  try {
    const { name, type, parent } = req.body
    const file = new File({ name, type, parent, user: req.userId })
    const parentFile = await File.findOne({ _id: parent })
    if (!parentFile) {
      file.path = name
      await fileService.createDir(file)
    } else {
      file.path = `${parentFile.path}/${file.name}`
      await fileService.createDir(file)
      parentFile.childs.push(file._id)
      await parentFile.save()
    }
    await file.save()
    return res.json({ file })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Ошибка создания файла' })
  }
}

const getFiles = async (req, res) => {
  try {
    const parent = req.query.parent
    const files = await File.find({ user: req.userId, parent })
    return res.json(files)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Ошибка получения файлов' })
  }
}

module.exports = {
  createDir,
  getFiles
}