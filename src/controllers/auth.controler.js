const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req, res) {

    try {
        const { username, email, password, role = 'user' } = req.body;

        const existingUser = await userModel.findOne({
            $or: [{ username },
            { email }
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                msg: "already exist"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({ username, email, password: hash, role });
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(201).json({
            message: "user register success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            msg: "Invalid Credintials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            msg: "Invalid Credintials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        msg: "logged in success",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })



}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ msg: "User logged out" })
}

module.exports = { registerUser, loginUser, logoutUser }