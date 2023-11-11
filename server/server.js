require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })