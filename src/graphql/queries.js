import { gql } from "@apollo/client"

export const GET_ALL_ITEMS = gql`
  query GetItems(
    $page: Int!
    $size: Int!
    $category: Category
    $language: Language!
    $currency: Currency!
  ) {
    getItems(page: $page, size: $size, category: $category) {
      docs {
        _id
        name(language: $language)
        price(currency: $currency)
        category
      }
      totalPages
    }
  }
`

export const GET_ITEM = gql`
  query Query($id: ID!, $language: Language!, $currency: Currency!) {
    getItem(id: $id) {
      name(language: $language)
      price(currency: $currency)
      description(language: $language)
      category
      available
    }
  }
`

export const SHOPPING_CART = gql`
  query GetShoppingCartItems {
    cartItems @client
  }
`

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
