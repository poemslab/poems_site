const express = require('express')
const app = express()
const path = require('path')
require("dotenv").config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//CONNECT TO DATABASE
mongoose.connect('mongodb://localhost:27017/stihi-site', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
  console.log('Connected to database')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/poems', require('./routes/poems'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('App ready')
})