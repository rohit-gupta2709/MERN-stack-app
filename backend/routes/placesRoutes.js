const express = require('express')
const router = express.Router()
const { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace } = require('../controllers/placesController')

router.get('/user/:userId', getPlacesByUserId)

router.get('/:placeId', getPlaceById)
router.patch('/:placeId', updatePlace)
router.delete('/:placeId', deletePlace)

router.post('/', createPlace)


module.exports = router