const {
  ApolloServer,
  AuthenticationError,
} = require("apollo-server-express")
const {
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core")

const { graphqlUploadExpress } = require("graphql-upload")

const dotenv = require("dotenv")
dotenv.config()

// Check that environment variables are set
const check = require("./server/utils/envValidation")
check()

const mongoose = require("mongoose")

const express = require("express")
const http = require("http")
const cors = require("cors")

const jwt = require("jsonwebtoken")

const { typeDefs, resolvers } = require("./server/Collective")
const { Account } = require("./server/schemas/Account")

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(`Error connecting to database: ${e}`))

const startApolloServer = async () => {
  const app = express()
  app.use(express.static("build"))
  app.use(cors())
  app.use(
    graphqlUploadExpress({ maxFileSize: 16000000, maxFiles: 10 })
  )

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

          const currentAccount = await Account.findById(
            decodedToken._id
          )
          return { currentAccount }
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
