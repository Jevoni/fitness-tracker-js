const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verify-jwt')

const supplementController = require('../controllers/supplementsController')

router.get('/', verifyJWT, supplementController.getSupplement)

router.post('/', verifyJWT, supplementController.postSupplement)

router.put('/:id', verifyJWT, supplementController.patchSupplement)

router.delete('/:id', verifyJWT, supplementController.deleteSupplement)

module.exports = router