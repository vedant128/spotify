const express = require('express');
const router = express.Router();
const multer = require('multer')
const musicController = require('../controllers/music.controller')


const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single("music"), musicController.createMusic)

module.exports = router;