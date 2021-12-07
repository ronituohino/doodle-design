import mongoose from "mongoose"

const optionsSchema = new mongoose.Schema({
  label: [String],
  options: [[String]],
})

const Options = mongoose.model("Options", optionsSchema)

export default Options
