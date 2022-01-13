import { gql } from "@apollo/client"

export const REGISTER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

// ADMIN

export const CRETE_CATEGORY = gql`
  mutation CreateCategory(
    $name: String!
    $label: String!
    $icon: String!
  ) {
    createCategory(name: $name, label: $label, icon: $icon)
  }
`

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $name: LanguageString!
    $price: CurrencyString!
    $images: [ID!]!
    $description: LanguageString!
    $customization: [OptionsInput]!
    $category: ID!
  ) {
    createItem(
      name: $name
      price: $price
      images: $images
      description: $description
      customization: $customization
      category: $category
    ) {
      _id
    }
  }
`

export const FILE_UPLOAD = gql`
  mutation FileUpload($file: Upload!) {
    singleUpload(file: $file) {
      _id
      filename
      mimetype
      encoding
      location
    }
  }
`
