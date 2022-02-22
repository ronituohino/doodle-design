const mongoose = require("mongoose")
const fs = require("fs")

const deleteProductFiles = async (productId) => {
  // This is to avoid circular requires
  const Product = mongoose.model("Product")
  const product = await Product.findById(productId).populate("images")

  product.images.forEach((i) => {
    const path = `./public/images/${i._id}-${i.filename}`
    fs.unlink(path, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`File ${i._id}-${i.filename} deleted from server`)
      }
    })
  })
}

module.exports = { deleteProductFiles }
