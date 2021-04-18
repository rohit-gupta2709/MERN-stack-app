if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const placesRoutes = require('./routes/placesRoutes')
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose');
mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE')
    next()
})

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