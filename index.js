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

app.get("/update/product/:id", async (req, res) => {
  // const data = await product.findAll()
  const id = req.params.id
  const data = await product.findByPk(id)

  res.render("product/update", {
    id,
    data
  })
})

app.post("/product/update/:id", async (req, res) => {
  const { ...body } = req.body
  const data = { ...body }
  // console.log(data);
  const id = req.params.id
  const updateProduct = await product.update(data, {
    where: {
      id
    }
  })

  res.status(200).json({
    status: 'success',
    message: `Data dengan index ${id} telah berhasil terupdate`
  })
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})