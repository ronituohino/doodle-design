import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  postalcode: String,
  country: String,
  company: String,
  phone: String,
})

const Address = mongoose.model("Address", addressSchema)

export default Address
