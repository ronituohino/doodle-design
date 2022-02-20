const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  encoding: { type: String, required: true },
})

const File = mongoose.model("File", fileSchema)

const fs = require("fs")
const { streamToBase64 } = require("../utils/serverUtils")
const { requireAdmin } = require("../utils/authentication")

const fileResolvers = {
  Query: {
    getFileById: async (root, args) => {
      const file = await File.findById(args.id)
      return file
    },
  },
  Mutation: {
    fileUpload: async (root, { files }, context) => {
      requireAdmin(context)

      let results = []
      for (let i = 0; i < files.length; i++) {
        const { createReadStream, filename, mimetype, encoding } =
          await files[i]

        // Accept images only
        if (mimetype.split("/")[0] !== "image") {
          return false
        }

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams

        const stream = createReadStream()
        const streamData = await streamToBase64(stream)

        const fileId = new mongoose.Types.ObjectId()

        const mongooseFile = new File({
          _id: fileId,
          filename,
          mimetype,
          encoding,
          // Image backup is possible...
          //data: streamData,
        })

        const response = await mongooseFile.save()
        results.push(response)

        // If location has folders that don't exist, the image is not saved
        const location = `./public/images/${fileId}-${filename}`

        // Then save image to public/files/... folder
        // where it can be served from
        const buffer = Buffer.from(streamData, "base64")
        fs.writeFile(location, buffer, () => {
          console.log(`File ${fileId}-${filename} uploaded to server`)
        })
      }

      return results
    },
  },
}

const fileTypeDefs = `
  scalar Upload

  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    getFileById(id: ID!): File
  }

  extend type Mutation {
    fileUpload(files: [Upload]!): [File]!
  }
`

module.exports = { File, fileResolvers, fileTypeDefs }
