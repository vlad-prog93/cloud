const {Router} = require('express')
const { checkAuth } = require('../middleware/auth')
const {createDir, getFiles, uploadFile, downloadFile, deleteFile} = require('../controllers/file')
const router = new Router()

router.post('/', checkAuth, createDir)
router.post('/upload', checkAuth, uploadFile)
router.get('/', checkAuth, getFiles)
router.delete('/', checkAuth, deleteFile)
router.get('/download', checkAuth, downloadFile)

module.exports = router