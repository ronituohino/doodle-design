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
  query GetItemById(
    $id: ID!
    $language: Language!
    $currency: Currency!
  ) {
    getItemById(id: $id) {
      _id
      name(language: $language)
      price(currency: $currency)
      customization(language: $language) {
        label
        options
      }
      description(language: $language)
      availability {
        available
      }
      category
      visible
      sale {
        salePrice(currency: $currency)
        saleActive
      }
      ratings {
        user
        rating
        comment
      }
    }
  }
`

export const SHOPPING_CART = gql`
  query GetShoppingCartItems {
    cartItems @client
  }
`

export const CHECKOUT = gql`
  query GetCheckoutVariables {
    checkout @client
  }
`

export const USER = gql`
  query GetUserInfo {
    me {
      username
    }
  }
`
