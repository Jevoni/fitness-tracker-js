const Weight = require('../models/Weights')

exports.getWeight = (req, res, next) => {
    const userId = req.userId
    Weight.find({ userId: userId })
        .then(documents => {
            return res.send(documents)
        })
}

exports.postWeight = (req, res, next) => {
    const date = req.body.date
    const name = req.body.name
    const reps = req.body.reps
    const sets = req.body.sets
    const userId = req.userId
    const weight = new Weight({
        date: date,
        name: name,
        reps: reps,
        sets: sets,
        userId: userId
    })
    return weight.save()
        .then(result => {
            res.sendStatus(200)
        })
}

exports.patchWeight = (req, res, next) => {
    const date = req.body.date
    const name = req.body.name
    const reps = req.body.reps
    const sets = req.body.sets
    const userId = req.userId
    const id = req.params.id
    Weight.findByIdAndUpdate({ _id: id })
        .then(weight => {
            weight.date = date
            weight.name = name
            weight.reps = reps
            weight.sets = sets
            weight.userId = userId
            weight.save()
            res.sendStatus(201)
        })
}

exports.deleteWeight = (req, res, next) => {
    const id = req.params.id
    Weight.findByIdAndDelete({ _id: id })
        .then(() => {
            res.sendStatus(200)
        })
}