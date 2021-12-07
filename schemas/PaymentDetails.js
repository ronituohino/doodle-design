import mongoose from "mongoose"

const paymentDetailsSchema = new mongoose.Schema({
  giftCard: String,
  details: String,
})

const PaymentDetails = mongoose.model(
  "PaymentDetails",
  paymentDetailsSchema
)

export default PaymentDetails
