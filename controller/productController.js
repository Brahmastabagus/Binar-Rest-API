const { product } = require('../models')

const getProduct = async (req, res) => {
  try {
    const data = await product.findAll()
    res.status(200).json({
      status: "success",
      data
    })
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error.message
    })
  }
}

const getIdProduct = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await product.findByPk(id)
    res.status(201).json({
      status: 'success',
      data
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body
    const newProduct = await product.create({
      name,
      price,
      stock
    })
    res.status(201).json({
      status: 'success',
      data: newProduct
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const deleteProduct = await product.destroy({
      where: {
        id
      }
    })
    res.status(200).json({
      status: 'success',
      message: `Data dengan index ${id} telah berhasil terhapus`
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

module.exports = {
  getProduct,
  getIdProduct,
  postProduct,
  updateProduct,
  deleteProduct
}