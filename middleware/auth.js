const jwt = require("jsonwebtoken")
const { users } = require('../models')

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        status: 'failed',
        message: "token tidak ditemukan"
      })
    }

    const bearerToken = req.headers.authorization

    const token = bearerToken.split("Bearer ")[1]

    const payload = jwt.verify(token, "s")

    // users.findByPk(payload.id).then(instance => {
    //   req.user = instance
    //   next()
    // })

    const user = await users.findByPk(payload.id)
    req.user = user
    next();
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e.message
    })
  }
}