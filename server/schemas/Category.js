const mongoose = require("mongoose");

const LanguageString = require("../types/LanguageString");

const categorySchema = new mongoose.Schema({
  urlPath: { type: String, required: true },
  label: { type: LanguageString, required: true },
  icon: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

const { requireAdmin } = require("../utils/authentication");

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      const categories = await Category.find({});
      return categories;
    },
  },
  Mutation: {
    createCategory: async (root, args, context) => {
      requireAdmin(context);

      const category = new Category({
        urlPath: args.urlPath,
        label: args.label,
        icon: args.icon,
      });

      const response = category.save();

      return response;
    },

    editCategory: async (root, args, context) => {
      requireAdmin(context);

      const category = await Category.findByIdAndUpdate(
        args._id,
        {
          ...(args.urlPath != null && { urlPath: args.urlPath }),
          ...(args.label != null && { label: args.label }),
          ...(args.icon != null && { icon: args.icon }),
        },
        { new: true }
      );

      return category;
    },

    deleteCategory: async (root, args, context) => {
      requireAdmin(context);

      await Category.findByIdAndDelete(args._id);

      return true;
    },
  },
};

const categoryTypeDefs = `
  type Category {
    _id: ID!
    urlPath: String!
    label: LanguageString!
    icon: String!
  }

  extend type Query {
    getCategories: [Category]!
  }

  extend type Mutation {
    createCategory(
      urlPath: String!
      label: LanguageStringInput!
      icon: String!
    ): Category!

    editCategory(
      _id: ID!
      urlPath: String
      label: LanguageStringInput
      icon: String
    ): Category!

    deleteCategory(_id: ID!): Boolean!
  }
`;

module.exports = { Category, categoryResolvers, categoryTypeDefs };
