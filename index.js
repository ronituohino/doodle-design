const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express")
const {
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core")

const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload")

const fs = require("fs")

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
const bcrypt = require("bcrypt")

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(`Error connecting to database: ${e}`))

const commonTypeDefs = gql`
  type Query {
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
    label: LanguageString!
    options: [LanguageString!]!
  }

  input OptionInput {
    label: LanguageString!
    option: LanguageString!
  }

  input LanguageString {
    EN: String!
    FI: String!
  }

  input CurrencyString {
    EUR: String!
  }
`

const {
  Category,
  categoryTypeDefs,
} = require("./server/schemas/Category.js")
const { File, fileTypeDefs } = require("./server/schemas/File.js")
const {
  Item,
  itemTypeDefs,
  itemInputDefs,
} = require("./server/schemas/Item.js")
const {
  Order,
  orderTypeDefs,
  orderInputDefs,
} = require("./server/schemas/Order.js")

const {
  User,
  userTypeDefs,
  userInputDefs,
} = require("./server/schemas/User.js")

const {
  languageToIndex,
  currencyToIndex,
  getPagination,
  hashPassword,
  createToken,
  streamToBase64,
  createLanguageList,
  formatCustomization,
  createCurrencyList,
} = require("./server/utils/serverUtils.js")

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

    searchItems: async (root, args) => {
      const results = await Item.find({
        name: `/${args.searchWord}/i`,
      })

      return results
    },

    getCategories: async () => {
      const categories = await Category.find({})
      return categories
    },

    getFileById: async (root, args) => {
      const file = await File.findById(args.id)
      return file
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
        name: createLanguageList(args.name),
        price: createCurrencyList(args.price),
        customization: formatCustomization(args.customization),
        description: createLanguageList(args.description),
        availability: { available: false },
        images: args.images,
        category: args.category,
        visible: false,
        sale: { salePrice: [], saleActive: false },
        ratings: [],
      })

      console.log(item.price)
      console.log(item.customization)

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
        args._id,
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

    createCategory: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      const category = new Category({
        name: args.name,
        label: args.label,
        icon: args.icon,
      })

      const response = category.save()

      return response
    },

    editCategory: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      const category = await Category.findByIdAndUpdate(
        args._id,
        {
          ...(args.name && { name: args.name }),
          ...(args.label && { label: args.label }),
          ...(args.icon && { icon: args.icon }),
        },
        { new: true }
      )

      return category
    },

    deleteCategory: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      await Category.findByIdAndDelete(args._id)

      return true
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

    fileUpload: async (root, { files }, context) => {
      // Check auth
      if (!context.currentUser) {
        throw new AuthenticationError("Not logged in, token invalid")
      }

      if (context.currentUser.accountType !== "Admin") {
        throw new UserInputError("Not an administrator account")
      }

      let results = []
      for (let i = 0; i < files.length; i++) {
        const { createReadStream, filename, mimetype, encoding } =
          await files[i]

        // Accept images only
        if (mimetype.split("/")[0] !== "image") {
          return false
        }

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams

        const stream = createReadStream()
        const streamData = await streamToBase64(stream)

        const fileId = new mongoose.Types.ObjectId()

        // If location has folders that don't exist, the image is not saved
        const location = `./public/files/images/${fileId}-${filename}`

        const mongooseFile = new File({
          _id: fileId,
          filename,
          mimetype,
          encoding,
          location,
          // Image backup disabled for now
          //data: streamData,
        })

        const response = await mongooseFile.save()
        results.push(response)

        // Then save image to public/files/... folder
        // where it can be served from
        const buffer = Buffer.from(streamData, "base64")
        fs.writeFile(location, buffer, () => {
          console.log(`File ${filename} uploaded to server`)
        })
      }

      console.log(results)
      return results
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

  Upload: GraphQLUpload,
}

const startApolloServer = async () => {
  const app = express()
  app.use(express.static("build"))
  app.use(cors())
  app.use(
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  )

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs: [
      commonTypeDefs,
      commonInputDefs,
      categoryTypeDefs,
      fileTypeDefs,
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
