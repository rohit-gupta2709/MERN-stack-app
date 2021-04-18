const HttpError = require('../models/httpError')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new Error('Authentication failed')
        }
        const decodedtoken = jwt.verify(token, 'super_secret_dont_share')
        req.userData = {
            userId: decodedtoken.userId
        }
        next()
    } catch (err) {
        const error = new HttpError('Authentication failed', 401)
        return next(error)
    }

}