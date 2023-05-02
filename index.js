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
  try {
    if (req.query.stock) {
      if (req.query.filter === "kurang") {
        if (req.query.search) {
          const data = await product.findAll({
            order: [["id", "Asc"]],
            where: {
              [Op.and]: [
                {
                  stock: {
                    [Op.lte]: parseInt(req.query.stock)
                  }
                },
                {
                  name: {
                    [Op.substring]: req.query.search
                  }
                }
              ]
            }
          })

          res.render("product/index", {
            data
          })
        }
      } else {
        const data = await product.findAll({
          where: {
            stock: {
              [Op.gte]: parseInt(req.query.stock)
            }
          }
        })

        res.render("product/index", {
          data
        })
      }
      // } else if (l) {

    } else {
      const data = await product.findAll({
        order: [["id", "Asc"]]
      })

      res.render("product/index", {
        data
      })
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
})

app.get("/api/product", async (req, res) => {
  // const data = await product.findAll()

  res.render("product/create")
})

app.post("/product/post", upload.single('imageUrl'), async (req, res) => {
  const { name, price, stock } = req.body
  const file = req.file

  // get extension file
  const split = file.originalname.split('.');
  const ext = split[split.length - 1];

  // proses upload file ke imagekit
  const img = await imagekit.upload({
    file: file.buffer, // required
    fileName: `IMG-${Date.now()}.${ext}`,
  })

  const data = await product.create({
    name,
    price,
    stock,
    imageUrl: img.url
  })

  // res.redirect("/product")

  res.status(201).json({
    data
  })
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

app.post("/product/update/:id", upload.single('imageUrl'), async (req, res) => {
  const { ...body } = req.body
  let data = { ...body }
  // console.log(data);
  const id = req.params.id

  const file = req.file

  // get extension file
  const split = file.originalname.split('.');
  const ext = split[split.length - 1];

  // proses upload file ke imagekit
  const img = await imagekit.upload({
    file: file.buffer, // required
    fileName: `IMG-${Date.now()}.${ext}`,
  })

  data = {
    ...data,
    imgUrl: img.url
  }

  const updateProduct = await product.update(data, {
    where: {
      id
    }
  })

  // res.redirect("/product")
  res.status(200).json({
    data
  })
})

app.get("/product/delete/:id", async (req, res) => {
  const id = req.params.id
  await product.destroy({
    where: {
      id
    }
  })

  res.redirect("/product")
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
})