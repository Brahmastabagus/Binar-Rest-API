const router = require('express').Router()

const productController = require('../controller/productController')

// GET
router.get("/", productController.getProduct)

// GET by ID
router.get("/:id", productController.getIdProduct)

// POST
router.post("/products", productController.postProduct)

// PUT
router.put('/product/:id', productController.updateProduct)

// DELETE
router.delete('/product/:id', productController.deleteProduct)

module.exports = router