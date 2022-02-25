const { GraphQLUpload } = require("graphql-upload")

const { accountResolvers, accountTypeDefs } = require("./Account")

const { categoryResolvers, categoryTypeDefs } = require("./Category")

const { fileResolvers, fileTypeDefs } = require("./File")

const { orderResolvers, orderTypeDefs } = require("./Order")

const { productResolvers, productTypeDefs } = require("./Product")

const language = require("../constants/language")
const currency = require("../constants/currency")
const datetime = require("../constants/datetime")

const commonTypeDefs = `
  type Query {
    me: Account
  }

  type Mutation {
    login(email: String!, password: String!): Token
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

  type LanguageString ${language.getGql()}
  type CurrencyFloat ${currency.getGql()}
  type DateObject ${datetime.getGql()}

  input OptionsInput {
    label: LanguageStringInput!
    options: [LanguageStringInput!]!
  }

  input OptionInput {
    label: LanguageStringInput!
    option: LanguageStringInput!
  }

  input LanguageStringInput ${language.getGql()}
  input CurrencyFloatInput ${currency.getGql()}
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

  Product: {
    ...productResolvers.Product,
  },

  Upload: GraphQLUpload,
}

module.exports = { typeDefs, resolvers }
