const router = require('express').Router()
const productController = require('../controller/productController')
const upload = require('../middleware/uploader')

// GET
router.get("/", productController.getProduct)

// GET by ID
router.get("/:id", productController.getIdProduct)

// POST
router.post("/", upload.single('imageUrl'), productController.postProduct)

// PUT
router.put('/:id', upload.single('imageUrl'), productController.updateProduct)

// DELETE
router.delete('/:id', productController.deleteProduct)

module.exports = router