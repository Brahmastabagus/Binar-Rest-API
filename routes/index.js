const router = require('express').Router()

const productController = require('../controller/productController')
const userController = require('../controller/userController')
const shopController = require('../controller/shopController')

// Product
// GET
router.get("/products", productController.getProduct)

// GET by ID
router.get("/products/:id", productController.getIdProduct)

// POST
router.post("/products", productController.postProduct)

// PUT
router.put('/products/:id', productController.updateProduct)

// DELETE
router.delete('/products/:id', productController.deleteProduct)


// Users
// GET
router.get("/users", userController.getUsers)

// GET by ID
router.get("/users/:id", userController.getIdUser)

// POST
router.post("/users", userController.postUser)

// PUT
router.put('/users/:id', userController.updateUser)

// DELETE
router.delete('/users/:id', userController.deleteUser)


// Shops
// GET
router.get("/shops", shopController.getShops)

// GET by ID
router.get("/shops/:id", shopController.getIdShops)

// POST
router.post("/shops", shopController.postShops)

// PUT
router.put('/shops/:id', shopController.updateShops)

// DELETE
router.delete('/shops/:id', shopController.deleteShops)

module.exports = router