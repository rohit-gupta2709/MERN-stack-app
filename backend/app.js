const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const placesRoutes = require('./routes/placesRoutes')

app.use('/api/places', placesRoutes)

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