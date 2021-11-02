import { gql } from "@apollo/client"

export const GET_ITEMS = gql`
  query GetItems(
    $language: Language!
    $category: Category
    $currency: Currency!
  ) {
    allItems(category: $category) {
      id
      name(language: $language)
      price(currency: $currency)
      category
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
