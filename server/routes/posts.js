const {Router} = require('express')
const multer = require('multer')

const router = new Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb( null , 'uploads' )
  },
  filename: (req, file, cb) => {
  cb( null , file.fieldname + '-' + Date.now())
  }
  })
const upload = multer({ storage: storage })

router.post('/', upload.single( 'image' ), (req, res) => {



})