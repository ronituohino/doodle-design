const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  contact: {
    ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  },
  orders: {
    type: Array,
    ref: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("User", schema)
