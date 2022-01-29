const mongoose = require("mongoose")

const { UserInputError } = require("apollo-server-express")

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

const bcrypt = require("bcrypt")

const { hashPassword, createToken } = require("../utils/serverUtils")

const {
  requireLogin,
  accountTypes,
} = require("../utils/authentication")

const accountResolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentAccount
    },
  },
  Mutation: {
    login: async (root, args) => {
      const user = await Account.findOne({ email: args.email })

      if (!user) {
        throw new UserInputError("Invalid credentials")
      }

      const validPassword = await bcrypt.compare(
        args.password,
        user.password
      )

      if (!validPassword) {
        throw new UserInputError("Invalid credentials")
      }

      return createToken(user._id)
    },

    createAccount: async (root, args) => {
      const passwordHash = await hashPassword(args.password)

      const user = new Account({
        username: args.username,
        password: passwordHash,
        email: args.email,
        accountType: accountTypes.CUSTOMER,
        orders: [],
        cart: [],
        verified: false,
      })

      try {
        const result = await user.save()
        return createToken(result._id)
      } catch (e) {
        throw new UserInputError(
          "Account with given email already exists"
        )
      }
    },

    editAccount: async (root, args, context) => {
      requireLogin(context)

      const user = await Account.findByIdAndUpdate(
        context.currentAccount._id,
        {
          ...(args.email && { email: args.email }),
          ...(args.password && {
            password: await hashPassword(args.password),
          }),
          ...(args.cart && {
            cart: args.cart,
          }),
        },
        { new: true }
      )

      return user
    },
  },
}

const accountTypeDefs = `
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
    ${accountTypes.ADMIN}
    ${accountTypes.CUSTOMER}
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

  input CartProductInput {
    referenceToProductId: ID!
    customization: [OptionInput]
    amount: Int!
  }
`

module.exports = {
  Account,
  accountResolvers,
  accountTypeDefs,
}
