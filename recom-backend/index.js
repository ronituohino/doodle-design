const { ApolloServer, AuthenticationError } = require("apollo-server")

// Check that environment variables are set
const check = require("./utils/envValidation")
check()

const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")

const { typeDefs, resolvers } = require("./Collective")
const { Account } = require("./schemas/Account")

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(`Error connecting to database: ${e}`))

const startApolloServer = async () => {
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
          throw new AuthenticationError("Invalid token")
        }
      }
    },
  })

  const port = process.env.BACKEND_PORT || 4000
  await server.listen({ port })

  //eslint-disable-next-line
  console.log("Server ready at http://localhost:4000/graphql")
}

startApolloServer()
