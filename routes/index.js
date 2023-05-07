const router = require('express').Router()
const swagger = require('swagger-ui-express')

const swaggerDocument = require("../docs/swagger.json")

const Dashboard = require('./dashboard')
const User = require('./user')
const Product = require('./product')
const Shop = require('./shop')

const auth = require("../middleware/auth")
const checkRole = require('../middleware/checkRole')

router.use("/api-docs", swagger.serve)
router.get("/api-docs", swagger.setup(swaggerDocument))

router.use("/dashboard", auth, Dashboard)
router.use("/api/v1/users", User)
// all role [get]
// []
router.use("/api/v1/products", auth, Product)
router.use("/api/v1/shops", auth, checkRole(["superadmin", "admin"]), Shop)

module.exports = router