const { product } = require('../models')

const imagekit = require('../lib/imagekit')

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
    return res.status(400).json({
      status: 'failed',
      message: `Harga harus diatas 10.000`
    })
  }

  await product.create({
    name,
    price,
    stock,
    imageUrl: img.url
  })

  res.redirect("/api/v1/products")

  // res.status(201).json({
  //   data
  // })
}

const updateProduct = async (req, res) => {
  // try {
  //   const { ...body } = req.body
  //   const data = { ...body }
  //   // console.log(data);
  //   const id = req.params.id
  //   const updateProduct = await product.update(data, {
  //     where: {
  //       id
  //     }
  //   })
  //   res.status(200).json({
  //     status: 'success',
  //     message: `Data dengan index ${id} telah berhasil terupdate`
  //   })
  // } catch (err) {
  //   res.status(400).json({
  //     status: "failed",
  //     message: err.message
  //   })
  // }

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

  // TODO: Validasi harga harus diatas 10.000
  if (data.price <= 10000) {
    return res.status(400).json({
      status: 'failed',
      message: `Harga harus diatas 10.000`
    })
  }

  await product.update(data, {
    where: {
      id
    }
  })

  // res.redirect("/product")
  res.status(200).json({
    data
  })
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  await product.destroy({
    where: {
      id
    }
  })

  res.redirect("/product")
}

module.exports = {
  getIdProduct,
  postProduct,
  updateProduct,
  deleteProduct
}