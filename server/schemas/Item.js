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
  category: { type: String, required: true },
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
    category: Category!
    visible: Boolean!
    sale: Sale
    ratings: [Rating]
  }

  type Availability {
    available: Boolean!
  }

  enum Category {
    fruits
    cars
    phones
    beds
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

  extend type Mutation {
    createItem(
      name: [String!]!
      price: [Float!]!
      description: [String!]!
      category: String!
    ): Item

    editItem(
      id: ID!
      name: [String!]
      price: [Float!]
      customization: [OptionsInput!]
      description: [String!]
      availability: AvailabilityInput
      category: Category
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
