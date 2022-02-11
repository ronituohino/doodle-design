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
    $deliveryAddress: DeliveryAddressInput!
    $billingAddress: BillingAddressInput!
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
