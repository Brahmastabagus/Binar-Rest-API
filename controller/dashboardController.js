const { product } = require('../models')

const getProduct = async (req, res) => {
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
}

const postProduct = async (req, res) => {
  res.render("product/create")
}

const updateProduct = async (req, res) => {
  const id = req.params.id
  const data = await product.findByPk(id)

  res.render("product/update", {
    id,
    data
  })
}

module.exports = {
  getProduct,
  postProduct,
  updateProduct
}