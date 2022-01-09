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

export const FILE_UPLOAD = gql`
  mutation FileUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`
