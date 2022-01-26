const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
  location: { type: String, required: true },
})

const File = mongoose.model("File", fileSchema)

const fileTypeDefs = `
  scalar Upload

  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    location: String!
  }

  extend type Query {
    getFileById(id: ID!): File
  }

  extend type Mutation {
    fileUpload(files: [Upload]!): [File]!
  }
`

module.exports = { File, fileTypeDefs }
