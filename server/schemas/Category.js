const mongoose = require("mongoose")
const { gql } = require("apollo-server-express")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
})

const Category = mongoose.model("Category", categorySchema)

const categoryTypeDefs = gql`
  type Category {
    _id: ID!
    name: String!
    label: String!
    icon: String!
  }

  extend type Query {
    getCategories: [Category]!
  }

  extend type Mutation {
    createCategory(
      name: String!
      label: String!
      icon: String!
    ): Category!
  }
`

module.exports = { Category, categoryTypeDefs }