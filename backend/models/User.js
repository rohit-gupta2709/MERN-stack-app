const mongoose = require('mongoose')
const schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: {
        url: String,
        filename: String,
        // required: true
    },
    places: [{
        type: mongoose.Types.ObjectId,
        ref: 'Place',
    }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)