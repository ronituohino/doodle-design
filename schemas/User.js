import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  verified: { type: Boolean, required: true },
})

const User = mongoose.model("User", userSchema)

export default User
