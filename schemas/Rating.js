import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
})

const Rating = mongoose.model("Rating", ratingSchema)

export default Rating
