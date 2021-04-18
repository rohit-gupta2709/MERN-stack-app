const express = require('express')
const router = express.Router()
const { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace } = require('../controllers/placesController')
const { check } = require('express-validator')
const upload = require('../middlewares/multer')
const checkAuth = require('../middlewares/checkAuth')

router.get('/user/:userId', getPlacesByUserId)
router.get('/:placeId', getPlaceById)

router.use(checkAuth)

router.post('/',
    upload.single('image'), [
    check('title').not().isEmpty(),
    check('description').not().isEmpty().isLength({ min: 5 }),
    check('address').not().isEmpty()
], createPlace)

router.patch('/:placeId', [
    check('title').not().isEmpty(),
    check('description').not().isEmpty().isLength({ min: 5 }),
    check('address').not().isEmpty()
], updatePlace)
router.delete('/:placeId', deletePlace)

module.exports = router