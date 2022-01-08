const mongoose = require("mongoose")
const { gql } = require("apollo-server-express")

const fileSchema = new mongoose.Schema({
  filename: { type: String },
  mimetype: { type: String },
  encoding: { type: String },
  location: { type: String },
  data: { type: Buffer },
})

const File = mongoose.model("File", fileSchema)

const fileTypeDefs = gql`
  scalar Upload

  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    location: String!
    data: String!
  }

  extend type Mutation {
    singleUpload(file: Upload!): Boolean!
  }
`

module.exports = { File, fileTypeDefs }
