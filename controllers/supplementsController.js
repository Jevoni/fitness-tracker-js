const Supplement = require('../models/Supplements')

exports.getSupplement = (req, res, next) => {
    const userId = req.userId
    Supplement.find({ userId: userId })
        .then(documents => {
            return res.send(documents)
        })
}

exports.postSupplement = (req, res, next) => {
    const date = req.body.date
    const name = req.body.name
    const dossage = req.body.dossage
    const userId = req.userId
    const supplement = new Supplement({
        date: date,
        name: name,
        dossage: dossage,
        userId: userId
    })
    return supplement.save()
        .then(result => {
            res.sendStatus(200)
        })
}

exports.patchSupplement = (req, res, next) => {
    const date = req.body.date
    const name = req.body.name
    const reps = req.body.reps
    const sets = req.body.sets
    const userId = req.userId
    const id = req.params.id
    Supplement.findByIdAndUpdate({ _id: id })
        .then(supplement => {
            supplement.date = date
            supplement.name = name
            supplement.reps = reps
            supplement.sets = sets
            supplement.userId = userId
            supplement.save()
            res.sendStatus(201)
        })
}

exports.deleteSupplement = (req, res, next) => {
    const id = req.params.id
    Supplement.findByIdAndDelete({ _id: id })
        .then(() => {
            res.sendStatus(200)
        })
}