const express = require('express')
const router = express.Router()
const { getUsers, signUp, login } = require('../controllers/userController')

router.get('/', getUsers)
router.post('/signup', signUp)
router.post('/login', login)

module.exports = router