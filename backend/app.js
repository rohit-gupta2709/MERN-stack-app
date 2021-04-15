const express = require('express')
const placesRoutes = require('./routes/placesRoutes')
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://rohitgupta:password2709@cluster0.gj2zb.mongodb.net/mern?retryWrites=true&w=majority'
// const localMONGO = 'mongodb://localhost:27017/MERN?retryWrites=true&w=majority'
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log("conncection refused")
        console.log(error)
    })

const HttpError = require('./models/httpError')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/places', placesRoutes)
app.use('/api/users', userRoutes)

// middleware to handle unreachable routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404)
    next(error)
})

//error middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500).json({ message: error.message || "An unknown error occured" })

})


app.listen(5000, () => {
    console.log("server is running")
})