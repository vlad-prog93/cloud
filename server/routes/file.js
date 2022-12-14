const {Router} = require('express')
const { checkAuth } = require('../middleware/auth')
const {createDir, getFiles} = require('../controllers/file')
const router = new Router()

router.post('/', checkAuth, createDir)
router.get('/', checkAuth, getFiles)

module.exports = router