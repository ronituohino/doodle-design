import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client"
import { ACCOUNT } from "../graphql/queries"
import { LOGIN } from "../graphql/mutations"

import { useSnackbar } from "notistack"

export const useAccount = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(ACCOUNT)
  const client = useApolloClient()

  const [loginMutation, loginData] = useMutation(LOGIN, {
    onError: (error) => {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      })
      return undefined
    },
    onCompleted: (response) => {
      setToken(response.login.token)
      client.resetStore()
    },
    notifyOnNetworkStatusChange: true,
  })

  const logIn = async (email, password) => {
    loginMutation({
      variables: {
        email,
        password,
      },
    })
  }

  const setToken = (token) => {
    localStorage.setItem("token", token)
  }

  const logOut = async (callback) => {
    localStorage.removeItem("token")
    await client.resetStore()
  }

  const loggedIn = () => {
    if (data && data.me) {
      return true
    }
    return false
  }

  return {
    logIn,
    loginData,
    logOut,
    data,
    loggedIn,
  }
}
