const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')


async function createMusic(req, res) {
    let decoded;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            msg: "No token provided"
        });
    }
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                msg: "only artist can add music"
            })
        }

    }
    catch (err) {
        return res.status(401).json({
            msg: "unauthorised"
        })
    }
    const title = req.body.title;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
    })

    res.status(201).json({
        msg: "Music Added success",
        music: {
            id: music._id,
            title: music.title,
            url: music.uri,
            artist: music.artist,
        }
    })


}


module.exports = { createMusic }
