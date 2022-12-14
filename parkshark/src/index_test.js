require('dotenv').config()
const geocode = require('./utils/geocode.js')
const express = require("express")
const db = require('./db/mongodb.js')

const userRouter = require('./routers/user')
const listingRouter = require('./routers/listing')
const bookingRouter = require('./routers/booking')
var cors = require('cors')


// require("./db/mongodb")  // ensures mongoose connects to the db

const app = express()
const port = process.env.PORT || 5000

app.use(cors()) // Use this after the variable declaration
app.use(express.json())
app.use(userRouter)
app.use(listingRouter)
app.use(bookingRouter)

app.listen(port, () => {
  console.log("Server is up on port " + port)
})


/*
geocode("UCLA", (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return console.log(error)
    }
    return console.log({latitude, longitude, location})  
})
*/