const HttpError = require('../models/httpError')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
    const place = DUMMY_PLACES.find(p => p.id === req.params.placeId)
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }
    res.json(place)
}

const getPlacesByUserId = (req, res, next) => {
    const places = DUMMY_PLACES.filter(p => p.creatorId === req.params.userId)
    if (places.length === 0) {
        const error = new HttpError('User does not exist for this id', 404)
        return next(error)
    }
    res.json(places)
}

const createPlace = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`Data is Invalid`, 422)
        return next(error)
    }

    const { title, description, image, address, creatorId } = req.body
    const createdPlace = { id: uuidv4(), title, description, image, address, creatorId }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({ place: createdPlace })
}

const updatePlace = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`Data is Invalid`, 422)
        return next(error)
    }

    const placeId = req.params.placeId
    const place = DUMMY_PLACES.find(p => p.id === placeId)
    const creatorId = place.creatorId
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }

    const places = DUMMY_PLACES.filter(p => p.id !== placeId)
    const { title, description, image, address } = req.body
    const updatedPlace = { id: placeId, title, description, image, address, creatorId }
    DUMMY_PLACES = [...places, updatedPlace]
    res.status(201).json({ place: updatedPlace })
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId
    const place = DUMMY_PLACES.find(p => p.id === placeId)
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }
    const places = DUMMY_PLACES.filter(p => p.id !== placeId)
    DUMMY_PLACES = [...places]
    res.status(201).json({ placeId: placeId })
}

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace }