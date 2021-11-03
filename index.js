import apolloServerExpressPackage from "apollo-server-express"
const { ApolloServer, gql } = apolloServerExpressPackage

import apolloServerCorePackage from "apollo-server-core"
const { ApolloServerPluginDrainHttpServer } = apolloServerCorePackage

import express from "express"
import http from "http"
import cors from "cors"

const items = [
  {
    id: "strawber",
    name: ["Strawberry", "Mansikka"],
    price: [2.4],
    description: ["A juicy fruit I think?", "Mehukas hedelmä, ehkä?"],
    available: true,
    visible: true,
    category: "apples",
  },

  {
    id: "banana",
    name: ["Banana", "Banaani"],
    price: [1.35],
    description: ["A long yellow banana", "Pitkä keltainen banaani"],
    available: false,
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
    available: false,
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
    available: true,
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
    orders: [
      {
        id: "o1",
        items: [
          {
            id: "i3",
            name: [
              {
                language: "en",
                text: "Blueberry",
              },
              {
                language: "fi",
                text: "Mustikka",
              },
            ],
            price: 2,
            description: [
              {
                language: "en",
                text: "A round and juicy and blue blueberry",
              },
              {
                language: "fi",
                text: "Pyöreä ja mehukas ja sininen mustikka",
              },
            ],
            available: false,
            category: "Fruits",
          },
        ],
        date: "12.23.10",
        deliveryAddress: {
          id: "a1",
          fullname: "ronija",
          address: "hämäläisentie 5",
          city: "Helsinki",
          postalcode: "00660",
          country: "Finland",
          contact: {
            email: "roni.alqkw@hotmail.com",
            phone: "0120301230",
          },
        },
        billingAddress: {
          id: "a1",
          fullname: "ronija",
          address: "hämäläisentie 5",
          city: "Helsinki",
          postalcode: "00660",
          country: "Finland",
          contact: {
            email: "roni.alqkw@hotmail.com",
            phone: "0120301230",
          },
        },
        status: "Delivered",
      },
    ],

    cart: ["1", "1", "2"],
  },
]

const typeDefs = gql`
  type Item {
    id: ID!
    name(language: Language!): String!
    price(currency: Currency!): Float!
    customization(language: Language!): [Options]!
    description(language: Language!): String!
    available: Boolean!
    category: Category!
    visible: Boolean!
  }

  type Options {
    label: String!
    options: [String!]!
  }

  type OrderItem {
    item: ID!
    amount: Int!
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
    contact: Contact!
    orders: [Order]!
    cart: [ID]!
  }

  type Contact {
    email: String!
    phone: String
  }

  type Address {
    id: ID!
    fullname: String!
    business: String
    address: String!
    city: String!
    postalcode: String!
    country: String!
    contact: Contact!
  }

  type Order {
    id: ID!
    items: [OrderItem!]!
    date: String!
    deliveryAddress: Address!
    billingAddress: Address!
    status: OrderStatus!
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

    allUsers: [User]!
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

    allUsers: () => users,
  },

  Item: {
    id: (root) => root.id,
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
            options: c.options.map((l) => l[languageToIndex(args.language)]),
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
    available: (root) => root.available,
    category: (root) => root.category,
  },

  User: {
    id: (root) => root.id,
    username: (root) => root.username,
    password: (root) => root.password,
    contact: (root) => root.contact,
    orders: (root) => root.orders,
  },

  Contact: {
    email: (root) => root.email,
    phone: (root) => root.phone,
  },

  Order: {
    id: (root) => root.id,
    items: (root) => root.items,
    date: (root) => root.date,
    deliveryAddress: (root) => root.deliveryAddress,
    billingAddress: (root) => root.billingAddress,
    status: (root) => root.status,
  },

  Address: {
    id: (root) => root.id,
    fullname: (root) => root.fullname,
    business: (root) => root.business,
    address: (root) => root.address,
    city: (root) => root.city,
    postalcode: (root) => root.postalcode,
    country: (root) => root.country,
    contact: (root) => root.contact,
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
