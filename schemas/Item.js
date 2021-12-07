import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: { type: [String], required: true },
  price: { type: [Number], required: true },
  customization: [
    {
      label: { type: [String], required: true },
      options: { type: [[String]], required: true },
    },
  ],
  description: { type: [String], required: true },
  availability: {
    available: { type: Boolean, required: true },
  },
  category: { type: String, required: true },
  visible: { type: Boolean, required: true },
  sale: {
    salePrice: { type: [Number], required: true },
    saleActive: { type: Boolean, required: true },
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: String,
    },
  ],
})

const Item = mongoose.model("Item", itemSchema)

export default Item
