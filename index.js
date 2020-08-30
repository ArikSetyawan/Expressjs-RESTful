// Import Package
const express = require("express")
const mongoose = require("mongoose")
const moment = require("moment")

// Define Apps
const app = express()

// Custom Function
const logger = (req, res, next) => {
    console.log(`=> ${moment().format()} ${req.originalUrl} - ${req.method} -- ${res.statusCode}`)
    next()
}

// DB
const db_url = "MongoDB URL"
mongoose.connect(
    db_url, 
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    () => console.log("db connected"))

// Middlewares
app.use(express.json())
app.use(logger)

// import routes
const userRoute = require('./routes/user.js')

// route
app.use('/api', userRoute) //user Route

// Run Server
app.listen(5000, () => {
    console.log(`app listening at http://localhost:5000`)
})