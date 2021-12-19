import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"

import {
  ApolloClient,
  HttpLink,
  gql,
  ApolloProvider,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"
import cache from "./cache"

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const port = process.env.BACKEND_PORT || 4000

const httpLink = new HttpLink({
  uri: `http://localhost:${port}/graphql`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),

  typeDefs,
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
