const { users, shops } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    
    // TODO: Validasi apakah id ada
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

const postUser = async (req, res) => {
  try {
    const { username, password, role } = req.body

    const hashPassword = bcrypt.hashSync(password, 10)

    // TODO: username sudah ada

    // Cara 1
    // const data = await users.findAll()
    // const userName = data.find(el => el.username === username);

    // Cara 2
    const userName = await users.findOne({
      where: {
        username
      }
    })

    if (userName !== null) {
      return res.status(404).json({
        status: 'failed',
        message: `username ${username} sudah ada`
      })
    }
    // minimal password

    const newUsers = await users.create({
      username,
      password: hashPassword,
      role
    })

    res.status(201).json({
      status: `Anda berhasil register sebagai ${role}`,
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
    const data = { ...req.body }
    const id = req.params.id

    const dataId = await users.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    const hashPassword = bcrypt.hashSync(data.password, 10)

    const userName = await users.findOne({
      where: {
        username: data.username
      }
    })
    const userId = await users.findOne({
      where: {
        id
      }
    })

    // TODO: Validasi apakah username sudah ada
    if (userName !== null && userName === userId) {
      return res.status(400).json({
        status: 'failed',
        message: `username ${data.username} sudah ada`
      })
    }

    await users.update({
      ...data,
      password: hashPassword
    }, {
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

    const dataId = await shops.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await users.destroy({
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await users.findOne({
      where: {
        username
      }
    })

    if (!user) {
      res.status(404).json({
        status: 'failed',
        message: `username ${username} tidak ditemukan`
      })
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
      }, "s")
      // username sudah ada
      // minimal password
  
      res.status(200).json({
        status: `Anda berhasil login sebagai ${user.role}`,
        data: {
          user,
          token
        }
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

module.exports = {
  getUsers,
  getIdUser,
  postUser,
  updateUser,
  deleteUser,
  login
}