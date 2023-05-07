const router = require('express').Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')

// GET
router.get("/", auth, checkRole(["superadmin", "admin"]), userController.getUsers)

// GET by ID
router.get("/:id", auth, checkRole(["superadmin", "admin"]), userController.getIdUser)

// POST
router.post("/register", auth, checkRole(["superadmin"]), userController.postUser)

// LOGIN
router.post("/login", userController.login)

// PUT
router.put('/:id', auth, checkRole(["superadmin"]), userController.updateUser)

// DELETE
router.delete('/:id', auth, userController.deleteUser)

module.exports = router