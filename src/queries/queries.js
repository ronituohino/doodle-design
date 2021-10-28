import { gql } from "@apollo/client"

export const GET_ITEMS = gql`
  query GetItems($language: Language!) {
    allItems {
      id
      name(language: $language)
      price
    }
  }
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
