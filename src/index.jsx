import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

import cache from "./cache"

const port = process.env.BACKEND_PORT || 4000

const uploadLink = createUploadLink({
  uri: `http://localhost:${port}/graphql`,
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token")

  operation.setContext(({ headers }) => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
  }))
  return forward(operation)
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(uploadLink),
})

import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
