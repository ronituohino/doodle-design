import { gql } from "@apollo/client"

export const REGISTER = gql`
  mutation CreateAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
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

export const EDIT_USER = gql`
  mutation EditUser(
    $email: String
    $password: String
    $cart: [CartItemInput]
  ) {
    editUser(email: $email, password: $password, cart: $cart) {
      _id
      orders
      accountType
      email
      password
      username
      verified
    }
  }
`

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $products: [OrderProductInput!]!
    $deliveryAddress: AddressInput!
    $billingAddress: AddressInput!
    $paymentDetails: PaymentDetailsInput!
    $extrainfo: String
  ) {
    createOrder(
      products: $products
      deliveryAddress: $deliveryAddress
      billingAddress: $billingAddress
      paymentDetails: $paymentDetails
      extrainfo: $extrainfo
    ) {
      _id
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

export const FILE_UPLOAD = gql`
  mutation FileUpload($files: [Upload]!) {
    fileUpload(files: $files) {
      _id
      filename
      mimetype
      encoding
      location
    }
  }
`
