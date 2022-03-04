import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $urlPath: String!
    $label: LanguageStringInput!
    $icon: String!
  ) {
    createCategory(urlPath: $urlPath, label: $label, icon: $icon) {
      _id
      urlPath
      label {
        en
        fi
      }
      icon
    }
  }
`

export const EDIT_CATEGORY = gql`
  mutation EditCategory(
    $id: ID!
    $urlPath: String
    $label: LanguageStringInput
    $icon: String
  ) {
    editCategory(
      _id: $id
      urlPath: $urlPath
      label: $label
      icon: $icon
    ) {
      _id
      urlPath
      label {
        en
        fi
      }
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
    $visible: Boolean
    $images: [ID!]
  ) {
    editProduct(
      _id: $id
      name: $name
      price: $price
      customization: $customization
      description: $description
      category: $category
      visible: $visible
      images: $images
    ) {
      _id
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id)
  }
`

export const EDIT_ACCOUNT = gql`
  mutation Mutation(
    $id: ID!
    $username: String
    $email: String
    $password: String
    $accountType: String
  ) {
    editAccountAdmin(
      _id: $id
      username: $username
      email: $email
      password: $password
      accountType: $accountType
    ) {
      _id
    }
  }
`

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(_id: $id)
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
