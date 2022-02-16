import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const CRETE_CATEGORY = gql`
  mutation CreateCategory(
    $name: String!
    $label: String!
    $icon: String!
  ) {
    createCategory(name: $name, label: $label, icon: $icon) {
      _id
      name
      label
      icon
    }
  }
`

export const EDIT_CATEGORY = gql`
  mutation EditCategory(
    $id: ID!
    $name: String
    $label: String
    $icon: String
  ) {
    editCategory(_id: $id, name: $name, label: $label, icon: $icon) {
      _id
      label
      name
      icon
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(_id: $id)
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: LanguageStringInput!
    $price: CurrencyFloatInput!
    $images: [ID!]!
    $description: LanguageStringInput!
    $customization: [OptionsInput]!
    $category: ID!
  ) {
    createProduct(
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

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: ID!
    $name: LanguageStringInput
    $price: CurrencyFloatInput
    $customization: [OptionsInput]
    $description: LanguageStringInput
    $category: ID
    $availability: AvailabilityInput
    $visible: Boolean
  ) {
    editProduct(
      _id: $id
      name: $name
      price: $price
      customization: $customization
      description: $description
      category: $category
      availability: $availability
      visible: $visible
    ) {
      _id
    }
  }
`

export const FILE_UPLOAD = gql`
  mutation FileUpload($files: [Upload]!) {
    fileUpload(files: $files) {
      _id
      filename
      mimetype
      encoding
    }
  }
`
