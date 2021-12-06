import apolloServerExpressPackage from "apollo-server-express"
const { ApolloServer, gql } = apolloServerExpressPackage

import apolloServerCorePackage from "apollo-server-core"
const { ApolloServerPluginDrainHttpServer } = apolloServerCorePackage

import dotenv from "dotenv"
dotenv.config()

import express from "express"
import http from "http"
import cors from "cors"

import jwt from "jsonwebtoken"

const items = [
  {
    id: "strawber",
    name: ["Strawberry", "Mansikka"],
    price: [2.4],
    description: ["A juicy fruit I think?", "Mehukas hedelmä, ehkä?"],
    availability: { available: false },
    visible: true,
    category: "apples",
  },

  {
    id: "banana",
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

const users = [
  {
    id: "u1",
    username: "Roni",
    password: "123qwe123",
    contact: {
      email: "roni.alqkw@hotmail.com",
      phone: "0120301230",
    },
    accountType: "Admin",
    orders: [
      {
        id: "o1",
        items: [
          {
            referenceToItemId: "banana",
            name: ["Banana", "Banaani"],
            price: [1.35],
            pickedCustomization: [
              {
                label: ["Banana length", "Banaanin pituus"],
                options: [["Small", "Pieni"]],
              },
              {
                label: ["Banana color", "Banaanin väri"],
                options: [["Yellow", "Keltainen"]],
              },
            ],
            amount: 3,
          },
        ],
        datetime: "12.23.10---13:23:11.3",
        deliveryAddress: {
          fullname: "ronija",
          address: "hämäläisentie 5",
          city: "Helsinki",
          postalcode: "00660",
          country: "Finland",
          phone: "0120301230",
        },
        billingAddress: {
          fullname: "ronija",
          address: "hämäläisentie 5",
          city: "Helsinki",
          postalcode: "00660",
          country: "Finland",
        },
        status: "Delivered",
      },
    ],

    cart: ["1", "1", "2"],
    verified: true,
  },
]

const typeDefs = gql`
  type Item {
    id: ID!
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
    id: ID!
    username: String!
    password: String!
    accountType: AccountType!
    contact: Contact!
    orders: [Order]!
    cart: [ID]!
    verified: Boolean!
  }

  enum AccountType {
    Customer
    Support
    Admin
  }

  type Contact {
    email: String!
    phone: String
  }

  type Address {
    fullname: String!
    address: String!
    city: String!
    postalcode: String!
    country: String!
    company: String
    phone: String
  }

  type Order {
    id: ID!
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
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    itemCount: () => items.length,
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
      const user = users.find((u) => u.username === args.username)
      if (!args.username || !args.password || !user) {
        throw new Error("Invalid credentials")
      }

      const userToken = {
        id: user.id,
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
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
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        )
        const currentUser = users.find(
          (u) => u.id === decodedToken.id
        )
        return { currentUser }
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
