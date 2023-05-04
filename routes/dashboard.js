const router = require('express').Router()
const dashboardController = require('../controller/dashboardController')

// GET
router.get("/", dashboardController.getProduct)

// POST
router.get("/add", dashboardController.postProduct)

// PUT
router.get('/update/:id', dashboardController.updateProduct)

module.exports = router