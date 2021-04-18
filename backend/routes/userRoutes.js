const express = require('express')
const router = express.Router()
const { getUsers, signUp, login } = require('../controllers/userController')
const { check } = require('express-validator')
const upload = require('../middlewares/multer')

router.get('/', getUsers)
router.post('/signup',
    upload.single('image')
    , [
        check('name').not().isEmpty().withMessage('cannot be empty'),
        check('email').normalizeEmail().isEmail(),
        check('password')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('must contain a number')
    ], signUp)
router.post('/login', [
    check('email').normalizeEmail().isEmail(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number')
], login)


module.exports = router