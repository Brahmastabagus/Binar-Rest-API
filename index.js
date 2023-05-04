const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')
const { product } = require("./models")
const { Op } = require('sequelize')

const app = express()
const PORT = 8080

const imagekit = require('./lib/imagekit')
const upload = require('./middleware/uploader')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})