const router = require('express').Router()
const shopController = require('../controller/shopController')

// GET
router.get("/", shopController.getShops)

// GET by ID
router.get("/:id", shopController.getIdShops)

// POST
router.post("/", shopController.postShops)

// PUT
router.put('/:id', shopController.updateShops)

// DELETE
router.delete('/:id', shopController.deleteShops)

module.exports = router