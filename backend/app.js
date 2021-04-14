const express = require('express')
const placesRoutes = require('./routes/placesRoutes')
const userRoutes = require('./routes/userRoutes')

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