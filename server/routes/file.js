const {Router} = require('express')
const { checkAuth } = require('../middleware/auth')
const {createDir, getFiles, uploadFile} = require('../controllers/file')
const router = new Router()

router.post('/', checkAuth, createDir)
router.post('/upload', checkAuth, uploadFile)
router.get('/', checkAuth, getFiles)

module.exports = router