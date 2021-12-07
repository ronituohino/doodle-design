import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
  referenceToItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  price: Number,
  customization: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Options" },
  ],
  amount: Number,
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema)

export default OrderItem
