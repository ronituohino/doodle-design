if (process.env.NODE_ENV === "production") {
  require("dotenv").config()
}

const { ApolloServer } = require("apollo-server-express")

const { graphqlUploadExpress } = require("graphql-upload")

// Check that environment variables are set
const check = require("./utils/envValidation")
check()

const mongoose = require("mongoose")

const express = require("express")
const http = require("http")
const cors = require("cors")

const jwt = require("jsonwebtoken")

const { typeDefs, resolvers } = require("./schemas/Collective")
const { Account } = require("./schemas/Account")
const {
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core")

mongoose
  .connect(process.env.DB_URI, { serverSelectionTimeoutMS: 60000 }) // Attempt for 1 minute until timeout
  .then(() => console.log("Server connected to database"))
  .catch((e) => console.log(`Error connecting to database: ${e}`))

require("./utils/files")
  .syncFromDatabase()
  .then(() => console.log("Server files synced with database"))

const startApolloServer = async () => {
  const app = express()
  app.use(cors())
  app.use("/images", express.static("public/images"))
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"))
  }

  app.use(
    graphqlUploadExpress({ maxFileSize: 16000000, maxFiles: 10 })
  )

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    cors: true,
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
          return
        }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  const port = process.env.PORT || 4000

  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port }, resolve))

  //eslint-disable-next-line
  console.log(`Server running on port ${port}`)
}

startApolloServer()
