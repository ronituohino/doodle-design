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
          _id
          name
          icon
          label
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
      images
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
      visible
      sale {
        salePrice {
          EUR
        }
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
