const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const MONGODB_URI = 'mongodb+srv://Jevoni:T9zfuHDidicpnMHZ@cluster0.sgynhsa.mongodb.net/fitness-tracker'

const app = express()

const userRoute = require('./routes/user')
const weightsRoute = require('./routes/weights')
const cardioRoute = require('./routes/cardio')
const supplementRoute = require('./routes/supplements')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token')
    next()
})

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use('/user', userRoute)
app.use('/weight', weightsRoute)
app.use('/cardio', cardioRoute)
app.use('/supplement', supplementRoute)

mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, () =>
    console.log('Connected to DB!'));
app.listen(process.env.PORT || 8000)