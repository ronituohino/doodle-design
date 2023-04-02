import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation CreateAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const EDIT_ACCOUNT = gql`
  mutation EditAccountClient(
    $email: String
    $password: String
    $cart: [CartProductInput]
  ) {
    editAccountClient(email: $email, password: $password, cart: $cart) {
      _id
      accountType
      email
      password
      username
    }
  }
`;

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
`;
