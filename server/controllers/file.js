const fs = require('fs')
const path = require('path')
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

const uploadFile = async (req, res) => {
  try {
    const file = req.files.file
    const parent = req.body.parent
    const parentDir = await File.findOne({user: req.userId, _id: parent})
    const user = await User.findOne({_id: req.userId})

    if (user.usedSpace + file.size > user.diskSpace) {
      return res.status(400).json({message: 'Недостаточно места на диске'})
    }
    console.log(user.usedSpace)
    console.log(file)
    console.log(user.diskSpace)

    user.usedSpace = user.usedSpace + file.size

    let pathFile
    if (parentDir) {
      pathFile = path.join(__dirname, `../files/${user._id}/${parentDir.path}/${file.name}`)
    } else {
      pathFile = path.join(__dirname, `../files/${user._id}/${file.name}`)
    }

    if (fs.existsSync(pathFile)) {
      return res.status(400).json({message: 'Файл с таким именем уже существует'})
    }
    file.mv(pathFile)

    const dbFile = await new File({
      type: file.name.split('.').pop(),
      name: file.name,
      size: file.size,
      user: user._id,
      parent: parentDir?._id,
      path: parentDir?.path
    })

    await dbFile.save()
    await user.save()

    return res.json({file: dbFile})


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
  getFiles,
  uploadFile
}