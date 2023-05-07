const { product } = require('../models')

const imagekit = require('../lib/imagekit')

const getProduct = async (req, res) => {
  try {
    const data = await product.findAll({
      order: [["id", "Asc"]]
    })
    
    res.status(200).json({
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
const getIdProduct = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await product.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    res.status(200).json({
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
    const file = req.file

    // get extension file
    const split = file.originalname.split('.');
    const ext = split[split.length - 1];

    // proses upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer, // required
      fileName: `IMG-${Date.now()}.${ext}`,
    })

    // TODO: Validasi harga harus diatas 10.000
    if (price <= 10000) {
      return res.status(409).json({
        status: 'failed',
        message: `Harga harus diatas 10.000`
      })
    }

    const data = await product.create({
      name,
      price,
      stock,
      imageUrl: img.url
    })

    // res.redirect("/dashboard")

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

const updateProduct = async (req, res) => {
  try {

    let data = { ...req.body }
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

    const dataId = await product.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    // TODO: Validasi harga harus diatas 10.000
    if (data.price <= 10000) {
      return res.status(409).json({
        status: 'failed',
        message: `Harga harus diatas 10.000`
      })
    }

    await product.update(data, {
      where: {
        id
      }
    })

    // res.redirect("/dashboard")
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
    const id = req.params.id

    const dataId = await product.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await product.destroy({
      where: {
        id
      }
    })

    // res.redirect("/dashboard")
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