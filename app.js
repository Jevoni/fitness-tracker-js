const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

const userRoute = require('./routes/user')
const weightsRoute = require('./routes/weights')
const cardioRoute = require('./routes/cardio')
const supplementsRoute = require('./routes/supplements')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-ALlow-Headers', 'Content-Type')
    next()
})

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// app.use('/user', userRoute)
// app.use('/weights', weightsRoute)
// app.use('/cardio', cardioRoute)
// app.use('/supplements', supplementsRoute)

// mongoose.set('strictQuery', true)
// mongoose.connect('', console.log('Connected to DB!'))

app.listen(process.env.PORT || 8000)