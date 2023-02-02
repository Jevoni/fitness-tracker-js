const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verify-jwt')

const weightsController = require('../controllers/weightsController')

router.get('/', verifyJWT, weightsController.getWeight)

router.post('/', verifyJWT, weightsController.postWeight)

router.put('/:id', verifyJWT, weightsController.patchWeight)

router.delete('/:id', verifyJWT, weightsController.deleteWeight)

module.exports = router