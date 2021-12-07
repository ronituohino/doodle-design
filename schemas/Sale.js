import mongoose from "mongoose"

const saleSchema = new mongoose.Schema({
  salePrice: Number,
  saleActive: Boolean,
})

const Sale = mongoose.model("Sale", saleSchema)

export default Sale
