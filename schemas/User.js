import mongoose from "mongoose"
import { gql } from "apollo-server-express"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  cart: [
    {
      referenceToItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      customization: [
        {
          label: { type: String, required: true },
          option: { type: String, required: true },
        },
      ],
      amount: { type: Number, required: true },
    },
  ],
  verified: { type: Boolean, required: true },
})

export const User = mongoose.model("User", userSchema)

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    accountType: AccountType!
    orders: [CartItem]!
    cart: [ID]!
    verified: Boolean!
  }

  type CartItem {
    referenceToItemId: ID!
    customization(language: Language!): [Options]!
    amount: Int!
  }

  enum AccountType {
    Customer
    Support
    Admin
  }

  extend type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
    ): Token
  }
`
