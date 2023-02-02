const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verify-jwt')

router.post('/login', userController.postLogin)

router.post('/signup', userController.postSignup)

router.post('/profile', verifyJWT, userController.patchUser)

router.get('/profile', verifyJWT, userController.getUser)

module.exports = router