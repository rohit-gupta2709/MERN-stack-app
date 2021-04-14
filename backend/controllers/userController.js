const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator');
const User = require('../models/User')

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Rohit',
        email: 'rohit@email.com',
        password: 'password'
    },
    {
        id: 'u2',
        name: 'Demo',
        email: 'demo@email.com',
        password: 'pass'
    }
]

const getUsers = (req, res, next) => {
    res.status(200).json(DUMMY_USERS)
}

const signUp = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`${errors.errors[0].param} ${errors.errors[0].msg}`, 422)
        return next(error)
    }

    const { name, email, password, places } = req.body

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
        name, email, password, places,
        image: 'https://www.gardeningknowhow.com/wp-content/uploads/2020/12/lonely-japanese-cherry.jpg'
    })

    await user.save()
    res.status(201).json(newUser)
}

const login = (req, res, next) => {
    const { email, password } = req.body
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password)
    if (!user) {
        const error = new HttpError('User does not exist with these credentials', 404)
        return next(error)
    }
    res.status(201).json(user)
}

module.exports = { getUsers, signUp, login }