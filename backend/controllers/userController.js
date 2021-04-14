const HttpError = require('../models/httpError')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

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

const signUp = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors.errors[0].msg)
        const error = new HttpError(`${errors.errors[0].param} ${errors.errors[0].msg}`, 422)
        return next(error)
    }

    const { name, email, password } = req.body

    const existingUser = DUMMY_USERS.find(u => u.email === email)
    if (existingUser) {
        const error = new HttpError('User exist with this email', 404)
        return next(error)
    }
    const newUser = { id: uuidv4(), name, email, password }
    DUMMY_USERS.push(newUser)
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