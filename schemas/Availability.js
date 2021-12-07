import mongoose from "mongoose"

const availabilitySchema = new mongoose.Schema({
  available: Boolean,
})

const Availability = mongoose.model(
  "Availability",
  availabilitySchema
)

export default Availability
