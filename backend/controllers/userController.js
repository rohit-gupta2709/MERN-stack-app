const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator');
const User = require('../models/User')

const getUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find({}, 'email name') // User.find({}, '-password)
    } catch (err) {
        const error = new HttpError('Cannot fetch users, try again later.', 400)
        return next(error)
    }
    res.status(200).json(users)
}

const signUp = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`${errors.errors[0].param} ${errors.errors[0].msg}`, 422)
        return next(error)
    }

    const { name, email, password } = req.body

    let existingUser

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('sign up failed, try again later.', 404)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User exist with this email', 404)
        return next(error)
    }

    const user = new User({
        name, email, password,
        places: [],
        image: 'https://www.gardeningknowhow.com/wp-content/uploads/2020/12/lonely-japanese-cherry.jpg'
    })

    await user.save()
    res.status(201).json(user)
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
    if (existingUser.password !== password) {
        const error = new HttpError('User does not exist with these credentials', 404)
        return next(error)
    }
    res.status(201).json(existingUser)
}

module.exports = { getUsers, signUp, login }