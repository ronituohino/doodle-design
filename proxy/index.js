const proxy = require("express-http-proxy")
const express = require("express")
const http = require("http")
const cors = require("cors")

const app = express()
app.use(cors())
app.use("/", proxy("localhost:3000"))
app.use("/:3050", proxy("localhost:3050"))
app.use("/:4000", proxy("localhost:4000"))

const httpServer = http.createServer(app)

const port = 80
httpServer.listen(port)
console.log("Proxy running")
