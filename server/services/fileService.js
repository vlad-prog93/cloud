const fs = require('fs')
const path = require('path')
const File = require('../models/File')

class FileService {
  createDir(file) {
    const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`)
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true })
          return resolve({message: 'File was created'})
        } else {
          return reject({message: 'File already exist'})
        }
      } catch(e) {
        return reject({message: 'File error', e})
      }
    })
  }
}

module.exports = new FileService()