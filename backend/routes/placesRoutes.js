const express = require('express')
// const bodyParser = require('body-parser')
const router = express.Router()

const HttpError = require('../models/httpError')

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'EMPIRE STATE BUILDING',
        description: 'One of the most famaous sky scrapers in the world',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, Ny 10001',
        creatorId: 'u2'
    }
]

router.get('/user/:userId', (req, res, next) => {
    const places = DUMMY_PLACES.filter(p => p.creatorId === req.params.userId)
    if (places.length === 0) {
        const error = new HttpError('User does not exist for this id', 404)
        return next(error)
    }
    res.json(places)
})

router.get('/:placeId', (req, res, next) => {
    const place = DUMMY_PLACES.find(p => p.id === req.params.placeId)
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }
    res.json(place)
})

module.exports = router