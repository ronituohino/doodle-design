import { ApolloServer, gql } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import express from "express"
import http from "http"

const items = [
  {
    name: [
      {
        language: "EN",
        name: "Strawberry",
      },
      {
        language: "FI",
        name: "Mansikka",
      },
    ],
    price: 2.4,
    description: [
      {
        language: "EN",
        description: "A juicy fruit I think?",
      },
      {
        language: "FI",
        description: "Mehukas hedelmä, ehkä?",
      },
    ],
    available: true,
    category: "Fruits",
  },

  {
    name: [
      {
        language: "EN",
        name: "Banana",
      },
      {
        language: "FI",
        name: "Banaani",
      },
    ],
    price: 3.45,
    description: [
      {
        language: "EN",
        description: "A long yellow banana",
      },
      {
        language: "FI",
        description: "Pitkä keltainen banaani",
      },
    ],
    available: false,
    category: "Bananas",
  },

  {
    name: [
      {
        language: "EN",
        name: "Blueberry",
      },
      {
        language: "FI",
        name: "Mustikka",
      },
    ],
    price: 2,
    description: [
      {
        language: "EN",
        description: "A round and juicy and blue blueberry",
      },
      {
        language: "FI",
        description: "Pyöreä ja mehukas ja sininen mustikka",
      },
    ],
    available: false,
    category: "Fruits",
  },
]

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    contact: Contact!
    orders: [Order]!
  }

  type Contact {
    id: ID!
    fullname: String!
    business: String
    address: String!
    city: String!
    postalcode: String!
    country: String!
    phone: String!
    email: String!
  }

  type Order {
    id: ID!
    items: [[Item!]!]!
    date: Int!
    deliveryAddress: Contact!
    billingAddress: Contact!
  }

  enum Category {
    Fruits
    Pears
    Bananas
  }

  type Item {
    id: ID!
    name: [LanguageString!]!
    price: Float!
    description: [LanguageString!]
    available: Boolean!
    category: Category!
  }

  enum Language {
    FI
    EN
  }

  type LanguageString {
    text: String!
    language: Language!
  }

  type Query {
    itemCount: Int!
    allItems: [Item!]!
  }
`

const resolvers = {
  Query: {
    itemCount: () => items.length(),
    allItems: () => items,
  },

  Item: {},
}

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  app.use(express.static("build"))

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))

  //eslint-disable-next-line
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
