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

const items = [
  {
    _id: "strawber",
    name: ["Strawberry", "Mansikka"],
    price: [2.4],
    description: ["A juicy fruit I think?", "Mehukas hedelmä, ehkä?"],
    availability: { available: false },
    visible: true,
    category: "apples",
  },

  {
    _id: "banana",
    name: ["Banana", "Banaani"],
    price: [1.35],
    description: ["A long yellow banana", "Pitkä keltainen banaani"],
    availability: { available: true },
    visible: true,
    category: "bananas",
    customization: [
      {
        label: ["Banana length", "Banaanin pituus"],
        options: [
          ["Small", "Pieni"],
          ["Big", "Iso"],
        ],
      },
      {
        label: ["Banana color", "Banaanin väri"],
        options: [
          ["Green", "Vihreä"],
          ["Yellow", "Keltainen"],
        ],
      },
    ],
  },

  {
    id: "blueberry",
    name: ["Blueberry", "Mustikka"],
    price: [13],
    description: [
      "A round and juicy and blue blueberry",

      "Pyöreä ja mehukas ja sininen mustikka",
    ],
    availability: { available: false },
    visible: false,
    category: "apples",
  },
  {
    id: "strawberry-yoghurt-with-bits-of-chocolate",
    name: [
      "Strawberry Yoghurt With Bits of Chocolate",

      "Mansikkajugurtti ja suklaahippuja",
    ],
    price: [13344.55],
    description: [
      "This amazing strawberry yoghurt includes chocolate bits to tingle those taste buds of yours for an amazing morning yoghurting-experience!",

      "Tämä uskomaton mansikkajugurtti sisältää suklaahippuja, jotka miellyttävät makunystyröitäsi luodakseen uskomattoman aamu-jugurtteilu-kokemuksen!",
    ],
    availability: { available: true },
    visible: true,
    category: "apples",
  },
]

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
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    postalcode: String!
    country: String!
    company: String
    phone: String
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
  }
`

import Item from "./schemas/Item.js"
import User from "./schemas/User.js"

const resolvers = {
  Query: {
    itemCount: async () => {
      const items = await Item.find({})
      return items.length
    },
    allItems: (root, args) => {
      let result = items.filter((i) => i.visible)

      if (args.category) {
        result = result.filter((i) => i.category === args.category)
      }

      return result
    },

    getItem: (root, args) => {
      return items.find((i) => i.id === args.id)
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    login: async (root, args) => {
      if (!args.email || !args.password) {
        throw new UserInputError("Missing credentials")
      }

      const user = await User.findOne({ email: args.email })
      const validPassword = await bcrypt.compare(
        args.password,
        user.password
      )

      if (!validPassword) {
        throw AuthenticationError("Invalid credentials")
      }

      const userToken = {
        id: user._id,
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
    },

    createUser: async (root, args) => {
      if (!args.username || !args.email || !args.password) {
        throw new UserInputError("Missing user information")
      }

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

      const userToken = {
        id: result._id,
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
    },

    createItem: async (root, args) => {
      if (
        !args.name ||
        !args.price ||
        !args.description ||
        !args.category
      ) {
        throw new UserInputError("Missing information")
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
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}

startApolloServer(typeDefs, resolvers)
