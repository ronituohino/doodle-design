const mongoose = require("mongoose")

const LanguageString = require("../types/LanguageString.js")
const CurrencyFloat = require("../types/CurrencyFloat.js")

const { gql } = require("apollo-server-express")

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
  products: [
    {
      referenceToProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      price: { type: CurrencyFloat, required: true },
      customization: [
        {
          label: { type: LanguageString, required: true },
          option: { type: LanguageString, required: true },
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

const orderTypeDefs = gql`
  type Order {
    _id: ID!
    products: [OrderProduct!]!
    datetime: String!
    deliveryAddress: Address!
    billingAddress: Address!
    paymentDetails: PaymentDetails!
    status: OrderStatus!
    extrainfo: String
  }

  type OrderProduct {
    referenceToProductId: ID!
    price: CurrencyFloat!
    customization: [Option]!
    amount: Int!
  }

  type Address {
    addressDetails: AddressDetails!
    phone: String
  }

  type AddressDetails {
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    postalcode: String!
    country: String!
    company: String
  }

  type PaymentDetails {
    coupon: String
    method: PaymentMethod!
  }

  type PaymentMethod {
    method: String!
    provider: String
  }

  enum OrderStatus {
    Pending
    Received_Order
    In_Delivery
    Delivered
  }

  extend type Mutation {
    createOrder(
      products: [OrderProductInput!]!
      deliveryAddress: AddressInput!
      billingAddress: AddressInput!
      paymentDetails: PaymentDetailsInput!
      extrainfo: String
    ): Order
  }
`

const orderInputDefs = gql`
  input OrderProductInput {
    referenceToProductId: ID!
    price: CurrencyFloatInput!
    customization: [OptionInput!]
    amount: Int!
  }

  input AddressInput {
    addressDetails: AddressDetailsInput!
    phone: String
  }

  input AddressDetailsInput {
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    postalcode: String!
    country: String!
    company: String
  }

  input PaymentDetailsInput {
    coupon: String
    method: PaymentMethodInput!
  }

  input PaymentMethodInput {
    method: String!
    provider: String
  }
`
module.exports = { Order, orderTypeDefs, orderInputDefs }
