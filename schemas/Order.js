import mongoose from "mongoose"
import { gql } from "apollo-server-express"

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

export const Order = mongoose.model("Order", orderSchema)

export const orderTypeDefs = gql`
  type Order {
    _id: ID!
    items: [OrderItem!]!
    datetime: String!
    deliveryAddress: Address!
    billingAddress: Address!
    paymentDetails: PaymentDetails!
    status: OrderStatus!
    extrainfo: String
  }

  type OrderItem {
    referenceToItemId: ID!
    price(currency: Currency!): Float!
    customization(language: Language!): [Option]!
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
    giftCard: String
    details: String!
  }

  enum OrderStatus {
    Pending
    Received_Order
    In_Delivery
    Delivered
  }

  extend type Mutation {
    createOrder(
      items: [OrderItemInput!]!
      datetime: String!
      deliveryAddress: AddressInput!
      billingAddress: AddressInput!
      paymentDetails: PaymentDetailsInput!
      extrainfo: String
    ): Order
  }
`

export const orderInputDefs = gql`
  input OrderItemInput {
    referenceToItemId: ID!
    price: Float!
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
    giftCard: String
    details: String!
  }
`
