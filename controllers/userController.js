const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.postSignup = (req, res, next) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log('Account already exist!')
                return res.status(400).send({ status: 400, error: 'Account already exist!' })
            }
            bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashedPassword
                    })
                    user.save()
                    return res.status(200).send(user)
                })
        })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('User does not exist!')
                res.status(400).send({ status: 400 })
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log('Login Posted!')
                        const id = user.id
                        const token = jwt.sign({ id }, 'topsecret', {
                            // expiresIn: 300
                        })

                        return res.status(200).json(token)
                        return req.session.save(err => {
                            console.log(err)
                        })
                    }
                    res.status(400).send({ status: 400 })
                    console.log('Incorrect password!')
                })
                .catch(err => console.log(err))
        })
        .catch(error => console.log(error))
}

exports.getUser = (req, res, next) => {
    const userId = req.userId
    User.findById({ _id: userId })
        .then(user => {
            res.status(200).send(user)
        })
}

exports.patchUser = (req, res, next) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const userId = req.userId
    User.findByIdAndUpdate({ _id: userId })
        .then(user => {
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.save()
        })
    res.sendStatus(200)
}