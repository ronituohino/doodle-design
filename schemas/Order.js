import mongoose from "mongoose"

const addressDetails = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalcode: { type: String, required: true },
  country: { type: String, required: true },
  company: String,
}

const orderSchema = new mongoose.Schema({
  items: [
    {
      referenceToItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      price: [{ type: Number, required: true }],
      customization: [
        {
          label: { type: String, required: true },
          option: { type: String, required: true },
        },
      ],
      amount: { type: Number, required: true },
    },
  ],
  datetime: { type: Date, required: true },
  deliveryAddress: {
    addressDetails,
    phone: String,
  },
  billingAddress: {
    addressDetails,
  },
  paymentDetails: {
    giftCard: String,
    details: { type: String, required: true },
  },
  status: { type: String, required: true },
  extrainfo: String,
})

const Order = mongoose.model("Order", orderSchema)

export default Order
