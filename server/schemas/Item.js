const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const { gql } = require("apollo-server-express")

const itemSchema = new mongoose.Schema({
  name: { type: [String], required: true },
  price: { type: [Number], required: true },
  images: { type: [mongoose.Schema.Types.ObjectId], ref: "File" },
  customization: [
    {
      label: { type: [String], required: true },
      options: { type: [[String]], required: true },
    },
  ],
  description: { type: [String], required: true },
  availability: {
    available: { type: Boolean, required: true },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  visible: { type: Boolean, required: true },
  sale: {
    salePrice: { type: [Number], required: true },
    saleActive: { type: Boolean, required: true },
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: String,
    },
  ],
})
itemSchema.plugin(mongoosePaginate)

const Item = mongoose.model("Item", itemSchema)

const itemTypeDefs = gql`
  type Item {
    _id: ID!
    name(language: Language!): String!
    price(currency: Currency!): Float!
    images: [ID!]!
    customization(language: Language!): [Options]!
    description(language: Language!): String!
    availability: Availability!
    category: ID!
    visible: Boolean!
    sale: Sale
    ratings: [Rating]
  }

  type Availability {
    available: Boolean!
  }

  type Sale {
    salePrice(currency: Currency!): Int
    saleActive: Boolean!
  }

  type Rating {
    user: ID!
    rating: Int!
    comment: String
  }

  extend type Query {
    itemCount: Int!
    getItems(category: ID, page: Int!, size: Int!): Paginated!
    getItemById(id: ID!): Item
    searchItems(searchWord: String!): [Item]!
  }

  extend type Mutation {
    createItem(
      name: LanguageString!
      price: CurrencyString!
      images: [ID!]!
      description: LanguageString!
      customization: [OptionsInput]!
      category: ID!
    ): Item

    editItem(
      _id: ID!
      name: LanguageString!
      price: CurrencyString!
      customization: [OptionsInput]!
      description: LanguageString!
      availability: AvailabilityInput
      category: ID!
      visible: Boolean
      sale: SaleInput
      ratings: RatingInput
    ): Item
  }
`

const itemInputDefs = gql`
  input AvailabilityInput {
    available: Boolean!
  }

  input SaleInput {
    salePrice: Int!
    saleActive: Boolean!
  }

  input RatingInput {
    user: ID!
    rating: Int!
    comment: String
  }
`

module.exports = { Item, itemTypeDefs, itemInputDefs }
