const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  items: {
    type: Array,
    ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deliveryAddress: {
    ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    required: true,
  },
  billingAddress: {
    ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    required: true,
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("Order", schema)
