const mongoose = require("mongoose")

const LanguageString = require("../types/LanguageString.js")
const CurrencyFloat = require("../types/CurrencyFloat.js")

const addressDetails = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
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
    method: { type: String, required: true },
    ...addressDetails,
    phone: String,
    extra: String,
  },
  billingAddress: {
    ...addressDetails,
  },
  paymentDetails: {
    coupons: { type: [String], required: true },
    details: {
      method: { type: String, required: true },
      provider: String,
    },
  },
  status: { type: String, required: true },
  extrainfo: String,
})

const Order = mongoose.model("Order", orderSchema)

const orderAddressFields = `
  firstName: String!
  lastName: String!
  address: String!
  city: String!
  zipCode: String!
  country: String!
  company: String
`

const orderTypeDefs = `
  type Order {
    _id: ID!
    products: [OrderProduct!]!
    datetime: String!
    billingAddress: BillingAddress!
    deliveryAddress: DeliveryAddress!
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

  type BillingAddress {
    ${orderAddressFields}
  }

  type DeliveryAddress {
    method: String!
    ${orderAddressFields}
    extra: String
    phone: String
  }

  type PaymentDetails {
    coupons: [String]!
    details: PaymentMethod!
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
      deliveryAddress: DeliveryAddressInput!
      billingAddress: BillingAddressInput!
      paymentDetails: PaymentDetailsInput!
      extrainfo: String
    ): Order
  }
`

const orderInputDefs = `
  input OrderProductInput {
    referenceToProductId: ID!
    price: CurrencyFloatInput!
    customization: [OptionInput!]
    amount: Int!
  }

  input BillingAddressInput {
    ${orderAddressFields}
  }

  input DeliveryAddressInput {
    method: String!
    ${orderAddressFields}
    extra: String
    phone: String
  }

  input PaymentDetailsInput {
    coupons: [String]!
    details: PaymentMethodInput!
  }

  input PaymentMethodInput {
    method: String!
    provider: String
  }
`
module.exports = { Order, orderTypeDefs, orderInputDefs }
