const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator')
const Place = require('../models/Place')
const User = require('../models/User')
const mongoose = require('mongoose');

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

    let userWithPlaces
    try {
        userWithPlaces = await User.findById(req.params.userId).populate('places')
    } catch (err) {
        const error = new HttpError('Cannot find places for this user', 500)
        return next(error)
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        const error = new HttpError('User does not exist for this id', 404)
        return next(error)
    }
    res.json(userWithPlaces.places)
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
        image,
        address,
        creator: creatorId
    })

    let user
    try {
        user = await User.findById(creatorId)
    } catch (err) {
        const error = new HttpError('Creating place failed try again', 500)
        return next(error)
    }
    if (!user) {
        const error = new HttpError('Cannot find user for provided id', 404)
        return next(error)
    }

    try {
        const SESSION = await mongoose.startSession()
        SESSION.startTransaction()
        await createdPlace.save({ session: SESSION })
        user.places.push(createdPlace)
        await user.save({ session: SESSION })
        await SESSION.commitTransaction()

    } catch (err) {
        console.log(err)
        const error = new HttpError('Creating place cannot failed try again', 500)
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
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError('Place does not exist for this id in the database', 404)
        return next(error)
    }
    if (!place) {
        const error = new HttpError('Place does not exist for this id', 404)
        return next(error)
    }
    try {
        await User.findByIdAndUpdate(place.creator, { $pull: { places: placeId } });
        await place.remove()
    } catch (err) {
        const error = new HttpError('Error deleting place for this id', 404)
        return next(error)
    }

    res.status(201).json({ placeId: placeId })
}

module.exports = { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace }