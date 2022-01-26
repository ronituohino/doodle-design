const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  cart: [
    {
      referenceToProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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

const Account = mongoose.model("Account", accountSchema)

const userTypeDefs = `
  type Account {
    _id: ID!
    username: String!
    password: String!
    email: String!
    accountType: AccountType!
    orders: [ID]!
    cart: [CartProduct]!
    verified: Boolean!
  }

  type CartProduct {
    referenceToProductId: ID!
    customization: [Options]!
    amount: Int!
  }

  enum AccountType {
    Customer
    Support
    Admin
  }

  extend type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): Token
    editAccount(
      email: String
      password: String
      cart: [CartProductInput]
    ): Account
  }
`

const userInputDefs = `
  input CartProductInput {
    referenceToProductId: ID!
    customization: [OptionInput]
    amount: Int!
  }
`
module.exports = { Account, userTypeDefs, userInputDefs }
