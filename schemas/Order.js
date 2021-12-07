import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
  datetime: Date,
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  paymentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentDetails",
  },
  status: String,
  extrainfo: String,
})

const Order = mongoose.model("Order", orderSchema)

export default Order
