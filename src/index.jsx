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

import { Helmet, HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Helmet
              bodyAttributes={{
                style: `background-color: ${theme.palette.secondary.main}`,
              }}
            />
            <App />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
