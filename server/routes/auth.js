const { Router } = require('express')
const validator = require('express-validator')
const {checkAuth, checkAccess} = require('../middleware/auth')
const { signUp, signIn, getUser} = require('../controllers/auth')
const {getUsers, deleteUser} = require('../controllers/user')
const router = new Router()

router.post('/signup', 
validator.body('username').isLength({min: 5}),
validator.body('password').isLength({min: 5})
,signUp)
router.post('/signin', 
validator.body('username').isLength({min: 5}),
validator.body('password').isLength({min: 5}),
signIn)
router.get('/me', checkAuth, getUser)
router.get('/users', checkAuth, checkAccess, getUsers)
router.delete('/users/:username', checkAuth, checkAccess, deleteUser)
module.exports = router