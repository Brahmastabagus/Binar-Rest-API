const { shops } = require('../models')

const getShops = async (req, res) => {
  try {
    const data = await shops.findAll()
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

const getIdShops = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await shops.findByPk(id)
    if (data !== null) {
      res.status(200).json({
        status: 'success',
        data
      })
    } else {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postShops = async (req, res) => {
  try {
    const { name, city } = req.body

    // TODO: Validasi kota harus purbalingga
    if (city.toLowerCase() !== "purbalingga") {
      return res.status(409).json({
        status: 'failed',
        message: `Kota harus Purbalingga`
      })
    }

    const newShops = await shops.create({
      name,
      city,
      userId: req.user.id
    })

    res.status(201).json({
      status: 'success',
      data: newShops
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateShops = async (req, res) => {
  try {
    const data = { ...req.body }
    const id = req.params.id

    const dataId = await shops.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    // TODO: Validasi kota harus purbalingga
    if (data.city.toLowerCase() !== "purbalingga") {
      return res.status(409).json({
        status: 'failed',
        message: `Kota harus Purbalingga`
      })
    }

    await shops.update(data, {
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

const deleteShops = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id

    const dataId = await shops.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await shops.destroy({
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
  getShops,
  getIdShops,
  postShops,
  updateShops,
  deleteShops
}