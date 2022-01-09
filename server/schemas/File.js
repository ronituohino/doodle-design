const mongoose = require("mongoose")
const { gql } = require("apollo-server-express")

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
  location: { type: String, required: true },
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
  }

  extend type Mutation {
    singleUpload(file: Upload!): Boolean!
  }
`

module.exports = { File, fileTypeDefs }
