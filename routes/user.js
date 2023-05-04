const router = require('express').Router()
const userController = require('../controller/userController')

// GET
router.get("/", userController.getUsers)

// GET by ID
router.get("/:id", userController.getIdUser)

// POST
router.post("/register", userController.postUser)

// LOGIN
router.post("/login", userController.login)

// PUT
router.put('/:id', userController.updateUser)

// DELETE
router.delete('/:id', userController.deleteUser)

module.exports = router