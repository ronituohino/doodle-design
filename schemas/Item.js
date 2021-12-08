import mongoose from "mongoose"
import { gql } from "apollo-server-express"

const itemSchema = new mongoose.Schema({
  name: { type: [String], required: true },
  price: { type: [Number], required: true },
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

export const Item = mongoose.model("Item", itemSchema)

export const itemTypeDefs = gql`
  type Item {
    _id: ID!
    name(language: Language!): String!
    price(currency: Currency!): Float!
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
    apples
    bananas
  }

  type Sale {
    salePrice: Int!
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

export const itemInputDefs = gql`
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
