const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator');
const User = require('../models/User')
const { cloudinary } = require('../Cloudinary/cloudinary')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError('Cannot fetch users, try again later.', 400)
        return next(error)
    }
    res.status(200).json(users)
}

const signUp = async (req, res, next) => {

    console.log(req.body)
    console.log(req.file)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        if (req.file)
            await cloudinary.uploader.destroy(req.file.filename)
        const error = new HttpError(`${errors.errors[0].param} ${errors.errors[0].msg}`, 422)
        return next(error)
    }

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        if (req.file)
            await cloudinary.uploader.destroy(req.file.filename)
        const error = new HttpError('sign up failed, try again later.', 404)
        return next(error)
    }

    if (existingUser) {
        if (req.file)
            await cloudinary.uploader.destroy(req.file.filename)
        const error = new HttpError('User exist with this email', 404)
        return next(error)
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError('could not create user try again later', 500)
        return next(error)
    }

    const user = new User({
        name, email, password: hashedPassword,
        places: [],
        image: {
            url: req.file.path,
            filename: req.file.filename
        },
    })
    await user.save()

    let token;
    try {
        token = jwt.sign({
            userId: user._id,
            email: user.email
        }, 'super_secret_dont_share',
            { expiresIn: '24h' })
    } catch (err) {
        const error = new HttpError('could not create token', 500)
        return next(error)
    }
    res.status(201).json({
        userId: user._id,
        email: user.email,
        token: token
    })
}

const login = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`${errors.errors[0].param} ${errors.errors[0].msg}`, 422)
        return next(error)
    }
    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('sign up failed, try again later.', 404)
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('User does not exist with this email', 404)
        return next(error)
    }

    let isValidPassword
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = new HttpError('Password comparision failed, try again later.', 404)
        return next(error)
    }

    if (!isValidPassword) {
        const error = new HttpError('User does not exist with these credentials', 404)
        return next(error)
    }

    let token;
    try {
        token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email
        }, 'super_secret_dont_share',
            { expiresIn: '24h' })
    } catch (err) {
        const error = new HttpError('could not create token', 500)
        return next(error)
    }
    res.status(201).json({
        userId: existingUser._id,
        email: existingUser.email,
        token: token
    })
    res.status(201).json({ message: 'logged in' })
}

module.exports = { getUsers, signUp, login }