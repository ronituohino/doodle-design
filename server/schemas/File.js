const mongoose = require("mongoose")
const { gql } = require("apollo-server-express")

const fileSchema = new mongoose.Schema({
  type: { type: String },
  data: { type: Buffer },
})

const File = mongoose.model("File", fileSchema)

const fileTypeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Mutation {
    singleUpload(file: Upload!): File!
  }
`

module.exports = { File, fileTypeDefs }
