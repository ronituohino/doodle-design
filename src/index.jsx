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

import { SnackbarProvider } from "notistack"
import { Collapse } from "@mui/material"

import { Helmet, HelmetProvider } from "react-helmet-async"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Helmet
              bodyAttributes={{
                style:
                  "background: linear-gradient(160deg, #0093E9 0%, #0093E9 0%, #80D0C7 60%) fixed",
              }}
            />
            <SnackbarProvider
              maxSnack={3}
              TransitionComponent={Collapse}
            >
              <App />
            </SnackbarProvider>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
