import apolloServerExpressPackage from "apollo-server-express"
const { ApolloServer, gql, UserInputError, AuthenticationError } =
  apolloServerExpressPackage

import apolloServerCorePackage from "apollo-server-core"
const { ApolloServerPluginDrainHttpServer } = apolloServerCorePackage

import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"

import express from "express"
import http from "http"
import cors from "cors"

import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB!"))

const typeDefs = gql`
  type Item {
    _id: ID!
    name(language: Language!): String!
    price(currency: Currency!): Float!
    customization(language: Language!): [Options]!
    description(language: Language!): String!
    availability: Availability!
    category: Category!
    visible: Boolean!
    sale: Sale
    ratings: [Rating]
  }

  type Availability {
    available: Boolean!
  }

  type Rating {
    user: ID!
    rating: Int!
    comment: String
  }

  type Sale {
    salePrice: Int!
    saleActive: Boolean!
  }

  type Options {
    label: String!
    options: [String!]!
  }

  input OptionsInput {
    label: String!
    option: String!
  }

  enum Category {
    apples
    bananas
  }

  enum Language {
    fi
    en
  }

  type LanguageString {
    text: String!
    language: Language!
  }

  enum Currency {
    EUR
  }

  type CurrencyFloat {
    currency: Currency!
    amount: Float!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    accountType: AccountType!
    orders: [Order]!
    cart: [ID]!
    verified: Boolean!
  }

  enum AccountType {
    Customer
    Support
    Admin
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
    customization(language: Language!): [Options]!
    amount: Int!
  }

  input OrderItemInput {
    referenceToItemId: ID!
    price: Float!
    customization: [OptionsInput]
    amount: Int!
  }

  type PaymentDetails {
    giftCard: String
    details: String!
  }

  input PaymentDetailsInput {
    giftCard: String
    details: String!
  }

  enum OrderStatus {
    Pending
    Received_Order
    In_Delivery
    Delivered
  }

  type Query {
    itemCount: Int!
    allItems(category: Category): [Item]!
    getItem(id: ID!): Item!

    me: User
  }

  type Token {
    value: String!
  }

  type Mutation {
    login(email: String!, password: String!): Token

    createUser(
      username: String!
      email: String!
      password: String!
    ): Token

    createItem(
      name: [String!]!
      price: [Float!]!
      description: [String!]!
      category: String!
    ): Item

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

import Item from "./schemas/Item.js"
import User from "./schemas/User.js"
import Order from "./schemas/Order.js"

const resolvers = {
  Query: {
    itemCount: async () => {
      const items = await Item.find({})
      return items.length
    },
    allItems: async (root, args) => {
      const items = await Item.find({
        ...(args.category && { cateogory: args.category }),
      })

      return items
    },

    getItem: async (root, args) => {
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
        throw AuthenticationError("Invalid credentials")
      }

      return createToken(user._id)
    },

    createUser: async (root, args) => {
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(args.password, salt)

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

    createItem: async (root, args) => {
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
        console.log(root)
        let arr = []
        root.customization.forEach((c) => {
          arr.push({
            label: c.label[languageToIndex(args.language)],
            options: c.options.map(
              (l) => l[languageToIndex(args.language)]
            ),
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
}

const createToken = (id) => {
  const userToken = { id }
  return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
}

const languageToIndex = (language) => {
  const list = ["en", "fi"]
  return list.indexOf(language)
}

const currencyToIndex = (currency) => {
  const list = ["EUR"]
  return list.indexOf(currency)
}

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  app.use(express.static("build"))
  app.use(cors())

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        try {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )

          const currentUser = await User.findById(decodedToken.id)
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

startApolloServer(typeDefs, resolvers)
