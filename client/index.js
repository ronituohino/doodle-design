const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())

const httpServer = require("http").createServer(app)

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Serving client on port ${PORT}`)
})
