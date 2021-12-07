import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  customization: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Options",
    },
  ],
  description: String,
  availability: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Options",
  },
  category: String,
  visible: Boolean,
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale",
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
})

const Item = mongoose.model("Item", itemSchema)

export default Item
