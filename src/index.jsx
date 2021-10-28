import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"

import { ApolloClient, HttpLink, gql, ApolloProvider } from "@apollo/client"

import cache from "./cache"

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`

const port = process.env.BACKEND_PORT || 4000

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: `http://localhost:${port}/graphql`,
  }),

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
