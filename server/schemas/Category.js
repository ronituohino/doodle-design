const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
})

const Category = mongoose.model("Category", categorySchema)

const categoryTypeDefs = `
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

    editCategory(
      _id: ID!
      name: String
      label: String
      icon: String
    ): Category!

    deleteCategory(_id: ID!): Boolean!
  }
`

module.exports = { Category, categoryTypeDefs }
