const { users, shops } = require('../models')

const getUsers = async (req, res) => {
  try {
    const data = await users.findAll()
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

const getIdUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await users.findByPk(id, {
      include: {
        model: shops,
        attributes: ["name"]
      }
    })
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

const postUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const newUsers = await users.create({
      username,
      password
    })

    // username sudah ada
    // minimal password

    res.status(201).json({
      status: 'success',
      data: newUsers
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { ...body } = req.body
    const data = { ...body }
    // console.log(data);
    const id = req.params.id
    const updateUser = await users.update(data, {
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

const deleteUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const deleteUser = await users.destroy({
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
  getUsers,
  getIdUser,
  postUser,
  updateUser,
  deleteUser
}