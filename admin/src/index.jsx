import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app/App"
import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"

import { SnackbarProvider } from "notistack"
import { Collapse } from "@mui/material"

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

import cache from "./cache"

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            TransitionComponent={Collapse}
          >
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
