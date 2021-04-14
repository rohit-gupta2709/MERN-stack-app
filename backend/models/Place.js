const mongoose = require('mongoose')
const schema = mongoose.Schema;

const placeSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    creator: { type: String, required: true }
})

module.exports = mongoose.model('Place', placeSchema)