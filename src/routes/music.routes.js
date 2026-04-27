const express = require('express');
const router = express.Router();
const multer = require('multer')
const musicController = require('../controllers/music.controller')
const authMiddleware = require('../middleware/auth.middleware')


const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', authMiddleware.authArtist, upload.single("music"), musicController.createMusic)
router.post('/album', authMiddleware.authArtist, musicController.createAlbum)


router.get("/", authMiddleware.authUser, musicController.getAllMusic)
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums)

module.exports = router;