import { ApolloServer, gql } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import express from "express"
import http from "http"
import cors from "cors"

const items = [
  {
    id: "i1",
    name: [
      {
        language: "en",
        text: "Strawberry",
      },
      {
        language: "fi",
        text: "Mansikka",
      },
    ],
    price: 2.4,
    description: [
      {
        language: "en",
        text: "A juicy fruit I think?",
      },
      {
        language: "fi",
        text: "Mehukas hedelmä, ehkä?",
      },
    ],
    available: true,
    category: "Fruits",
  },

  {
    id: "i2",
    name: [
      {
        language: "en",
        text: "Banana",
      },
      {
        language: "fi",
        text: "Banaani",
      },
    ],
    price: 3.45,
    description: [
      {
        language: "en",
        text: "A long yellow banana",
      },
      {
        language: "fi",
        text: "Pitkä keltainen banaani",
      },
    ],
    available: false,
    category: "Bananas",
  },

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
    price: Float!
    description(language: Language!): String!
    available: Boolean!
    category: Category!
  }

  enum Category {
    Fruits
    Pears
    Bananas
  }

  enum Language {
    fi
    en
  }

  type LanguageString {
    text: String!
    language: Language!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    contact: Contact!
    orders: [Order]!
    cart: [String]!
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
    items: [Item!]!
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
    allItems: [Item]!

    allUsers: [User]!
  }
`

const resolvers = {
  Query: {
    itemCount: () => items.length,
    allItems: () => items,

    allUsers: () => users,
  },

  Item: {
    id: (root) => root.id,
    name: (root, args) => {
      return root.name.find((e) => {
        return e.language === args.language
      }).text
    },
    price: (root) => root.price,
    description: (root, args) => {
      return root.description.find((e) => {
        return e.language === args.language
      }).text
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
