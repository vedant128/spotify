const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorizeed"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'artist') {
            return res.status(403).json({
                message: "you dont have access"
            })
        }
        req.user = decoded;
        next();

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "unauthorizeed"
        })

    }
}

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "unauthorizeed"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role != "user" && decoded.role != "artist") {
            return res.status(403).json({
                msg: "you dont hacve accesss"
            })
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "unauthorizeed"
        })
    }
}

module.exports = { authArtist, authUser };