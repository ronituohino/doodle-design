import {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"

import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"

import express from "express"
import http from "http"
import cors from "cors"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB!"))

const commonTypeDefs = gql`
  type Query {
    itemCount: Int!
    getItems(category: Category, page: Int!, size: Int!): Paginated!
    getItemById(id: ID!): Item!

    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Token
  }

  type Paginated {
    docs: [Item]!
    totalDocs: Int!
    offset: Int!
    limit: Int!
    totalPages: Int!
    page: Int!
    pagingCounter: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
    prevPage: Int!
    nextPage: Int!
  }

  enum Language {
    fi
    en
  }

  enum Currency {
    EUR
  }

  type Token {
    token: String!
  }

  type Options {
    label: String!
    options: [String!]!
  }

  type Option {
    label: String!
    option: String!
  }
`

const commonInputDefs = gql`
  input OptionsInput {
    label: String!
    options: [String!]!
  }

  input OptionInput {
    label: String!
    option: String!
  }
`

import {
  Item,
  itemTypeDefs,
  itemInputDefs,
} from "./server/schemas/Item.js"
import {
  User,
  userTypeDefs,
  userInputDefs,
} from "./server/schemas/User.js"
import {
  Order,
  orderTypeDefs,
  orderInputDefs,
} from "./server/schemas/Order.js"

import {
  languageToIndex,
  currencyToIndex,
  getPagination,
  hashPassword,
  createToken,
} from "./server/utils/serverUtils.js"

const resolvers = {
  Query: {
    itemCount: async () => {
      const items = await Item.find({})
      return items.length
    },
    getItems: async (root, args, context) => {
      const hideInvisible = context.currentUser === "Customer"
      const items = await Item.paginate(
        {
          ...(args.category && { category: args.category }),
          ...(hideInvisible && { visible: true }),
        },
        getPagination(args.page, args.size)
      )

      return items
    },

    getItemById: async (root, args) => {
      const item = await Item.findById(args.id)
      return item
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ email: args.email })
      const validPassword = await bcrypt.compare(
        args.password,
        user.password
      )

      if (!validPassword) {
        throw new AuthenticationError("Invalid credentials")
      }

      return createToken(user._id)
    },

    createUser: async (root, args) => {
      const passwordHash = await hashPassword(args.password)

      const user = new User({
        username: args.username,
        password: passwordHash,
        email: args.email,
        accountType: "Customer",
        orders: [],
        cart: [],
        verified: false,
      })

      const result = await user.save()

      return createToken(result._id)
    },

    editUser: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      const user = await User.findByIdAndUpdate(
        context.currentUser._id,
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

    createItem: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      const item = new Item({
        name: args.name,
        price: args.price,
        customization: args.customization,
        description: args.description,
        availability: { available: false },
        category: args.category,
        visible: false,
        sale: { salePrice: [], saleActive: false },
        ratings: [],
      })

      const result = await item.save()
      return result
    },

    editItem: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      const item = await Item.findByIdAndUpdate(
        args.id,
        {
          ...(args.name && { name: args.name }),
          ...(args.price && { price: args.price }),
          ...(args.customization && {
            cateogory: args.customization,
          }),
          ...(args.description && { description: args.description }),
          ...(args.availability && {
            availability: args.availability,
          }),
          ...(args.category && { cateogory: args.category }),
          ...(args.visible && { visible: args.visible }),
          ...(args.sale && { sale: args.sale }),
          ...(args.ratings && { ratings: args.ratings }),
        },
        { new: true }
      )

      return item
    },

    createOrder: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Customer") {
        throw new UserInputError("Not a customer account")
      }

      const order = new Order({
        items: args.items,
        datetime: args.datetime,
        deliveryAddress: args.deliveryAddress,
        billingAddress: args.billingAddress,
        paymentDetails: args.paymentDetails,
        status: "Pending",
        extrainfo: args.extrainfo,
      })

      const result = await order.save()

      await User.findByIdAndUpdate(context.currentUser._id, {
        $push: { orders: result._id },
      })

      return result
    },
  },

  Item: {
    name: (root, args) => {
      return root.name[languageToIndex(args.language)]
    },
    price: (root, args) => {
      return root.price[currencyToIndex(args.currency)]
    },
    customization: (root, args) => {
      if (root.customization) {
        let arr = []
        root.customization.forEach((c) => {
          arr.push({
            label: c.label[languageToIndex(args.language)],
            options: c.options[languageToIndex(args.language)],
          })
        })
        return arr
      } else {
        return []
      }
    },
    description: (root, args) => {
      return root.description[languageToIndex(args.language)]
    },
  },

  Sale: {
    salePrice: (root, args) => {
      return root.salePrice[currencyToIndex(args.currency)]
    },
  },
}

const startApolloServer = async () => {
  const app = express()
  app.use(express.static("build"))
  app.use(cors())

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs: [
      commonTypeDefs,
      commonInputDefs,
      itemTypeDefs,
      itemInputDefs,
      orderTypeDefs,
      orderInputDefs,
      userTypeDefs,
      userInputDefs,
    ],
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        try {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )

          const currentUser = await User.findById(decodedToken._id)
          return { currentUser }
        } catch (error) {
          throw new AuthenticationError("Invalid token")
        }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })

  const port = process.env.BACKEND_PORT || 4000
  await new Promise((resolve) => httpServer.listen({ port }, resolve))

  //eslint-disable-next-line
  console.log(
    `Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}

startApolloServer()
