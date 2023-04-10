const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const path = require('path')
const {product} = require("./models")

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))

app.get("/nama", async (req, res) => {
  res.render("index", {
    name: "SAay"
  })
  // try {
  //   const data = await product.findAll()
  // } catch (error) {
  //   res.status(400).json({
  //     status: "success",
  //     message: error.message
  //   })
  // }
})

app.get("/product", async (req, res) => {
  const data = await product.findAll()

  res.render("product/index", {
    data
  })
})

app.get("/api/product", async (req, res) => {
  // const data = await product.findAll()

  res.render("product/create")
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})