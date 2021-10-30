const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: [
    {
      language: {
        type: String,
        enum: ["FI", "EN"],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  description: [
    {
      language: {
        type: String,
        enum: ["FI", "EN"],
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  available: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    enum: ["Fruits", "Pears", "Bananas"],
  },
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model("Item", schema)
