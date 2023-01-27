const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
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
    const parentDir = await File.findOne({ user: req.userId, _id: parent })
    const user = await User.findOne({ _id: req.userId })

    if (user.usedSpace + file.size > user.diskSpace) {
      return res.status(400).json({ message: 'Недостаточно места на диске' })
    }

    user.usedSpace = user.usedSpace + file.size

    file.name = iconv.decode(file.name, 'utf-8')
    
    let pathFile
    if (parentDir) {
      pathFile = path.join(__dirname, `../files/${user._id}/${parentDir.path}/${file.name}`)
    } else {
      pathFile = path.join(__dirname, `../files/${user._id}/${file.name}`)
    }

    if (fs.existsSync(pathFile)) {
      return res.status(400).json({ message: 'Файл с таким именем уже существует' })
    }
    file.mv(pathFile)

    const dbFile = new File({
      type: file.name.split('.').pop(),
      name: file.name,
      size: file.size,
      user: user._id,
      parent: parentDir?._id,
      path: parentDir?.path
    })

    await dbFile.save()
    await user.save()

    return res.json({ file: dbFile })


  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Ошибка создания файла' })
  }
}

const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ user: req.userId, _id: req.query.id })
    const pathFile = path.join(__dirname, '../files', req.userId, file.path, file.name)
    if (fs.existsSync(pathFile)) {
      return res.download(pathFile)
    }
    return res.status(400).json({ message: 'Файл не найден' })

  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Ошибка загрузки файла' })
  }
}

const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({ user: req.userId, _id: req.query.id })
    const pathFile = path.join(__dirname, '../files', req.userId, file.path, file.name || '')

    if (file.type === "dir") {
      const pathFile = path.join(__dirname, '../files', req.userId, file.path)
      fs.rmdirSync(pathFile)
      const dbFile = await file.remove()
      return res.json({ file: dbFile })
    } else {
      if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile)
        const dbFile = await File.findOneAndDelete({ user: req.userId, _id: req.query.id })
        return res.json({ file: dbFile })
      }
    }
    return res.status(400).json({ message: 'Файл не найден' })
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Папка не пуста' })
  }
}

const getFiles = async (req, res) => {
  try {
    const parent = req.query.parent
    const sort  = req.query.sort
    const files = await File.find({ user: req.userId, parent }).sort(sort)
    return res.json(files)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Ошибка получения файлов' })
  }
}

module.exports = {
  createDir,
  getFiles,
  uploadFile,
  downloadFile,
  deleteFile
}