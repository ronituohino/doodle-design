import { gql } from "@apollo/client"

export const ACCOUNT = gql`
  query Account {
    me {
      _id
      username
      email
      accountType
    }
  }
`

export const GET_ACCOUNTS = gql`
  query GetAccounts($email: String) {
    getAccounts(email: $email) {
      _id
      username
      email
      accountType
    }
  }
`

export const GET_ACCOUNT_TYPES = gql`
  query Query {
    getAccountTypes {
      ADMIN
      CUSTOMER
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      name
      label
      icon
    }
  }
`
export const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int!
    $size: Int!
    $category: ID
    $search: SearchParams
  ) {
    getProducts(
      page: $page
      size: $size
      category: $category
      search: $search
    ) {
      docs {
        _id
        name {
          en
          fi
        }
        price {
          EUR
        }
        images {
          _id
          filename
        }
        customization {
          label {
            en
            fi
          }
          options {
            en
            fi
          }
        }
        description {
          en
          fi
        }
        category {
          _id
          name
          label
          icon
        }
        visible
      }
      totalPages
    }
  }
`
