const mongoose = require("mongoose")

const LanguageString = require("../types/LanguageString")
const CurrencyFloat = require("../types/CurrencyFloat")

const mongoosePaginate = require("mongoose-paginate-v2")

const productSchema = new mongoose.Schema({
  name: { type: LanguageString, required: true },
  price: { type: CurrencyFloat, required: true },
  images: { type: [mongoose.Schema.Types.ObjectId], ref: "File" },
  customization: [
    {
      label: { type: LanguageString, required: true },
      options: [{ type: LanguageString, required: true }],
    },
  ],
  description: { type: LanguageString, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  visible: { type: Boolean, required: true },
})
productSchema.plugin(mongoosePaginate)

const Product = mongoose.model("Product", productSchema)

const fs = require("fs")

const { getPagination } = require("../utils/serverUtils")
const {
  isAccountType,
  requireAdmin,
} = require("../utils/authentication")

const productResolvers = {
  Product: {
    category: async (root) => {
      const populated = await root.populate("category")
      return populated.category
    },
    images: async (root) => {
      const populated = await root.populate("images")
      return populated.images
    },
  },

  Query: {
    productCount: async () => {
      const products = await Product.find({})
      return products.length
    },
    getProducts: async (root, args, context) => {
      const type = isAccountType(context)
      const hideInvisible = type.customer || type.none

      const products = await Product.paginate(
        {
          ...(args.category != null && { category: args.category }),
          ...(hideInvisible && { visible: true }),
        },
        getPagination(args.page, args.size)
      )

      return products
    },

    getProductById: async (root, args) => {
      const product = await Product.findById(args.id)
      return product
    },

    searchProducts: async (root, args) => {
      const results = await Product.find({
        name: `/${args.searchWord}/i`,
      })

      return results
    },
  },

  Mutation: {
    createProduct: async (root, args, context) => {
      requireAdmin(context)

      const product = new Product({
        name: args.name,
        price: args.price,
        customization: args.customization,
        description: args.description,
        images: args.images,
        category: args.category,
        visible: false,
      })

      const result = await product.save()
      return result
    },

    editProduct: async (root, args, context) => {
      requireAdmin(context)

      // Remove previous images
      if (args.images) {
        const previousProduct = await Product.findById(
          args._id
        ).populate("images")
        previousProduct.images.forEach((i) => {
          const path = `./public/images/${i._id}-${i.filename}`
          fs.unlink(path, (error) => {
            if (error) {
              console.log(error)
            } else {
              console.log(
                `File ${i._id}-${i.filename} deleted from server`
              )
            }
          })
        })
      }

      // variable != null, will catch both null and undefined
      const product = await Product.findByIdAndUpdate(
        args._id,
        {
          ...(args.name != null && { name: args.name }),
          ...(args.price != null && { price: args.price }),
          ...(args.customization != null && {
            customization: args.customization,
          }),
          ...(args.description != null && {
            description: args.description,
          }),
          ...(args.category != null && { cateogory: args.category }),
          ...(args.visible != null && { visible: args.visible }),
          ...(args.images != null && { images: args.images }),
        },
        { new: true }
      )

      return product
    },

    deleteProduct: async (root, args, context) => {
      requireAdmin(context)

      const result = await Product.deleteOne({ _id: args._id })
      return result.deletedCount === 1
    },
  },
}

const productTypeDefs = `
  type Product {
    _id: ID!
    name: LanguageString!
    price: CurrencyFloat!
    images: [File!]!
    customization: [Options]!
    description: LanguageString!
    category: Category!
    visible: Boolean!
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

  extend type Query {
    productCount: Int!
    getProducts(category: ID, page: Int!, size: Int!): Paginated!
    getProductById(id: ID!): Product
    searchProducts(searchWord: String!): [Product]!
  }

  extend type Mutation {
    createProduct(
      name: LanguageStringInput!
      price: CurrencyFloatInput!
      images: [ID!]!
      description: LanguageStringInput!
      customization: [OptionsInput]!
      category: ID!
    ): Product

    editProduct(
      _id: ID!
      name: LanguageStringInput
      images: [ID!]
      price: CurrencyFloatInput
      customization: [OptionsInput]
      description: LanguageStringInput
      category: ID
      visible: Boolean
    ): Product

    deleteProduct(
      _id: ID!
    ): Boolean
  }
`

module.exports = {
  Product,
  productResolvers,
  productTypeDefs,
}
