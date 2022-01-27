const { GraphQLUpload } = require("graphql-upload")

const {
  accountResolvers,
  accountTypeDefs,
} = require("./schemas/Account")

const {
  categoryResolvers,
  categoryTypeDefs,
} = require("./schemas/Category")

const { fileResolvers, fileTypeDefs } = require("./schemas/File")

const { orderResolvers, orderTypeDefs } = require("./schemas/Order")

const {
  productResolvers,
  productTypeDefs,
} = require("./schemas/Product")

const commonTypeDefs = `
  type Query {
    me: Account
  }

  type Mutation {
    login(email: String!, password: String!): Token
  }

  type Paginated {
    docs: [Product]!
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
    label: LanguageString!
    options: [LanguageString!]!
  }

  type Option {
    label: LanguageString!
    option: LanguageString!
  }

  type LanguageString {
    en: String!
    fi: String!
  }

  type CurrencyFloat {
    EUR: Float!
  }

  input OptionsInput {
    label: LanguageStringInput!
    options: [LanguageStringInput!]!
  }

  input OptionInput {
    label: LanguageStringInput!
    option: LanguageStringInput!
  }

  input LanguageStringInput {
    en: String!
    fi: String!
  }

  input CurrencyFloatInput {
    EUR: Float!
  }
`
const typeDefs = [
  commonTypeDefs,
  accountTypeDefs,
  categoryTypeDefs,
  fileTypeDefs,
  orderTypeDefs,
  productTypeDefs,
]

const resolvers = {
  Query: {
    ...accountResolvers.Query,
    ...categoryResolvers.Query,
    ...fileResolvers.Query,
    ...orderResolvers.Query,
    ...productResolvers.Query,
  },

  Mutation: {
    ...accountResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...fileResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...productResolvers.Mutation,
  },

  Upload: GraphQLUpload,
}

module.exports = { typeDefs, resolvers }
