const mongoose = require("mongoose");

const { UserInputError } = require("apollo-server-express");

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true },
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
});

const Account = mongoose.model("Account", accountSchema);

const bcrypt = require("bcryptjs");

const { hashPassword, createToken } = require("../utils/serverUtils");

const { requireLogin, requireAdmin } = require("../utils/authentication");
const { isAccountType, types } = require("../constants/accountTypes");

const accountResolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentAccount;
    },
    getAccounts: async (root, args, context) => {
      requireAdmin(context);

      const results = await Account.find({
        ...(args.email != null && {
          email: {
            $regex: `${args.email}`,
            $options: "i",
          },
        }),
      });

      return results;
    },
    getAccountTypes: () => {
      return types;
    },
  },
  Mutation: {
    login: async (root, args) => {
      const user = await Account.findOne({ email: args.email });

      if (!user) {
        throw new UserInputError("Invalid credentials");
      }

      const validPassword = await bcrypt.compare(args.password, user.password);

      if (!validPassword) {
        throw new UserInputError("Invalid credentials");
      }

      return createToken(user._id);
    },

    createAccount: async (root, args) => {
      const passwordHash = await hashPassword(args.password);

      const user = new Account({
        username: args.username,
        password: passwordHash,
        email: args.email,
        accountType: types.CUSTOMER,
        cart: [],
        verified: false,
      });

      try {
        const result = await user.save();
        return createToken(result._id);
      } catch (e) {
        throw new UserInputError("Account with given email already exists");
      }
    },

    // Modifies anyone's account
    editAccountAdmin: async (root, args, context) => {
      requireAdmin(context);

      const user = await Account.findByIdAndUpdate(
        args._id,
        {
          ...(args.username != null && { username: args.username }),
          ...(args.email != null && { email: args.email }),
          ...(args.password != null && {
            password: await hashPassword(args.password),
          }),
          ...(args.accountType != null &&
            isAccountType(args.accountType) && {
              accountType: args.accountType,
            }),
          ...(args.cart != null && {
            cart: args.cart,
          }),
        },
        { new: true }
      );

      return user;
    },

    // Modifies only own account
    editAccountClient: async (root, args, context) => {
      requireLogin(context);

      const user = await Account.findByIdAndUpdate(
        context.currentAccount._id,
        {
          ...(args.email != null && { email: args.email }),
          ...(args.password != null && {
            password: await hashPassword(args.password),
          }),
          ...(args.cart != null && {
            cart: args.cart,
          }),
        },
        { new: true }
      );

      return user;
    },

    // This will delete account information, but the orders placed
    // by that account will remain in the database
    deleteAccount: async (root, args, context) => {
      requireAdmin(context);

      const result = await Account.deleteOne({ _id: args._id });
      return result.deletedCount === 1;
    },
  },
};

const accountTypeDefs = `
  type Account {
    _id: ID!
    username: String!
    password: String!
    email: String!
    accountType: AccountType!
    cart: [CartProduct]!
  }

  type SafeAccount {
    _id: ID!
    username: String!
    email: String!
    accountType: AccountType!
    cart: [CartProduct]!
  }

  type CartProduct {
    referenceToProductId: ID!
    customization: [Options]!
    amount: Int!
  }

  enum AccountType {
    ${types.ADMIN}
    ${types.CUSTOMER}
  }

  type AccountTypeObject {
    ADMIN: String!
    CUSTOMER: String!
  }

  extend type Query {
    getAccounts(
      email: String
    ): [SafeAccount]!

    getAccountTypes: AccountTypeObject!
  }

  extend type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
    ): Token

    editAccountAdmin(
      _id: ID!
      username: String
      email: String
      password: String
      accountType: String
      cart: [CartProductInput]
    ): Account

    editAccountClient(
      email: String
      password: String
      cart: [CartProductInput]
    ): Account

    deleteAccount(_id: ID!): Boolean
  }

  input CartProductInput {
    referenceToProductId: ID!
    customization: [OptionInput]
    amount: Int!
  }
`;

module.exports = {
  Account,
  accountResolvers,
  accountTypeDefs,
};
