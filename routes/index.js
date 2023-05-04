const router = require('express').Router()

const Dashboard = require('./dashboard')
const User = require('./user')
const Product = require('./product')
const Shop = require('./shop')

const auth = require("../middleware/auth")

router.use("/dashboard", auth, Dashboard)
router.use("/api/v1/users", auth, User)
router.use("/api/v1/products", auth, Product)
router.use("/api/v1/shops", auth, Shop)

module.exports = router