const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')
const albumModel = require("../models/album.model")



async function createMusic(req, res) {

    const title = req.body.title;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
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

async function createAlbum(req, res) {

    const { title, musicIds } = req.body;

    if (!title || !Array.isArray(musicIds) || musicIds.length === 0) {
        return res.status(400).json({ msg: "Invalid album data" });
    }

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musicIds
    })

    res.status(200).json({
        message: "Album created",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })


}

async function getAllMusic(req, res) {
    const musics = await musicModel
        .find()
        .skip(0)
        .populate("artist")
        .limit(1);

    res.status(200).json({
        msg: "musics fetched",
        musics: musics,

    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email");

    res.status(200).json({
        msg: "albums fetched",
        albums: albums,

    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums }
