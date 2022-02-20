const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
})

const Category = mongoose.model("Category", categorySchema)

const { requireAdmin } = require("../utils/authentication")

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      const categories = await Category.find({})
      return categories
    },
  },
  Mutation: {
    createCategory: async (root, args, context) => {
      requireAdmin(context)

      const category = new Category({
        name: args.name,
        label: args.label,
        icon: args.icon,
      })

      const response = category.save()

      return response
    },

    editCategory: async (root, args, context) => {
      requireAdmin(context)

      const category = await Category.findByIdAndUpdate(
        args._id,
        {
          ...(args.name != null && { name: args.name }),
          ...(args.label != null && { label: args.label }),
          ...(args.icon != null && { icon: args.icon }),
        },
        { new: true }
      )

      return category
    },

    deleteCategory: async (root, args, context) => {
      requireAdmin(context)

      await Category.findByIdAndDelete(args._id)

      return true
    },
  },
}

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

module.exports = { Category, categoryResolvers, categoryTypeDefs }
