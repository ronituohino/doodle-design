import { gql } from "@apollo/client"

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
  query GetProducts($page: Int!, $size: Int!, $category: ID) {
    getProducts(page: $page, size: $size, category: $category) {
      docs {
        _id
        name {
          en
          fi
        }
        price {
          EUR
        }
        category {
          name
        }
        images {
          _id
          filename
        }
      }
      totalPages
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      _id
      name {
        en
        fi
      }
      price {
        EUR
      }
      customization {
        label {
          fi
          en
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
      availability {
        available
      }
      category {
        _id
        name
        icon
        label
      }
      images {
        _id
        filename
      }
      visible
    }
  }
`

export const SHOPPING_CART = gql`
  query CartProducts {
    cartProducts @client
  }
`

export const ACCOUNT = gql`
  query Account {
    me {
      _id
      username
      password
      email
      accountType
      orders
      verified
    }
  }
`

export const GET_FILE_DETAILS = gql`
  query GetFileDetails($id: ID!) {
    getFileById(id: $id) {
      filename
      mimetype
      encoding
      location
    }
  }
`
