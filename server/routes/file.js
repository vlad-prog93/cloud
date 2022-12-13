const {Router} = require('express')
const { checkAuth } = require('../middleware/auth')
const {createDir} = require('../controllers/file')
const router = new Router()

router.post('/', checkAuth , createDir)

module.exports = router