const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verify-jwt')

const cardioController = require('../controllers/cardioController')

router.get('/', verifyJWT, cardioController.getCardio)

router.post('/', verifyJWT, cardioController.postCardio)

router.put('/:id', verifyJWT, cardioController.patchCardio)

router.delete('/:id', verifyJWT, cardioController.deleteCardio)

module.exports = router