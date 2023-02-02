const Cardio = require('../models/Cardio')

exports.getCardio = (req, res, next) => {
    const userId = req.userId
    Cardio.find({ userId: userId })
        .then((documents) => {
            return res.send(documents)
        })
}

exports.postCardio = (req, res, next) => {
    console.log('Setting cardio')
    const date = req.body.date
    const name = req.body.name
    const duration = req.body.duration
    const userId = req.userId
    const cardio = new Cardio({
        date: date,
        name: name,
        duration: duration,
        userId: userId
    })
    return cardio.save()
        .then(result => {
            res.sendStatus(200)
        })
}

exports.patchCardio = (req, res, next) => {
    const date = req.body.date
    const name = req.body.name
    const reps = req.body.reps
    const sets = req.body.sets
    const userId = req.userId
    const id = req.params.id
    Cardio.findByIdAndUpdate({ _id: id })
        .then(cardio => {
            cardio.date = date
            cardio.name = name
            cardio.reps = reps
            cardio.sets = sets
            cardio.userId = userId
            cardio.save()
            res.sendStatus(201)
        })
}

exports.deleteCardio = (req, res, next) => {
    const id = req.params.id
    Cardio.findByIdAndDelete({ _id: id })
        .then(() => {
            res.sendStatus(200)
        })
}