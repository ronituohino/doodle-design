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

// Sync local files to match database
const syncFromDatabase = async () => {
  const File = mongoose.model("File")
  const files = await File.find({})
  files.forEach((file) => {
    if (file.data) {
      const location = getFileLocation(file._id, file.filename)

      if (!fs.existsSync(location)) {
        const buffer = Buffer.from(file.data, "base64")
        fs.writeFile(location, buffer, () => {
          console.log(
            `File ${file._id}-${file.filename} retrieved from database`
          )
        })
      }
    }
  })
}

const getFileLocation = (fileId, filename) => {
  if (process.env.NODE_ENV === "production") {
    return `./public/images/production/${fileId}-${filename}`
  } else {
    return `./public/images/development/${fileId}-${filename}`
  }
}

module.exports = {
  deleteProductFiles,
  syncFromDatabase,
  getFileLocation,
}
