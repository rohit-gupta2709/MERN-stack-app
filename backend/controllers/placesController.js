const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator')
const Place = require('../models/Place')

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

const getPlaceById = async (req, res, next) => {
    let place
    try {
        place = await Place.findById(req.params.placeId)
    } catch (err) {
        const error = new HttpError('Cannot find place with this id', 500)
        return next(error)
    }

    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }
    res.json(place)
}

const getPlacesByUserId = async (req, res, next) => {

    let places
    try {
        places = await Place.find({ creator: req.params.userId })
    } catch (err) {
        const error = new HttpError('Cannot find places for this user', 500)
        return next(error)
    }

    if (!places || places.length === 0) {
        const error = new HttpError('User does not exist for this id', 404)
        return next(error)
    }
    res.json(places)
}

const createPlace = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`Data is Invalid`, 422)
        return next(error)
    }

    const { title, description, image, address, creatorId } = req.body
    const createdPlace = new Place({
        title,
        description,
        image: 'https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg',
        address,
        creator: creatorId
    })

    try {
        await createdPlace.save()
    } catch (err) {
        const error = new HttpError('Creating place failed try again', 500)
        return next(error)
    }

    res.status(201).json({ place: createdPlace })
}

const updatePlace = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new HttpError(`Data is Invalid`, 422)
        return next(error)
    }

    const { title, description, image, address } = req.body
    const placeId = req.params.placeId

    let updatedPlace

    try {
        updatedPlace = await Place.findByIdAndUpdate(placeId, { title, description, image, address, creator: 'u1' })
    } catch (err) {
        const error = new HttpError('Place does not exist for this id in database', 404)
        return next(error)
    }

    if (!updatedPlace) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }

    updatedPlace.save()

    res.status(201).json({ place: updatedPlace })
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.placeId

    let place
    try {
        place = await Place.findByIdAndDelete(placeId)
    } catch (err) {
        const error = new HttpError('Place does not exist for this id in the database', 404)
        return next(error)
    }
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }

    res.status(201).json({ placeId: placeId })
}

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace }