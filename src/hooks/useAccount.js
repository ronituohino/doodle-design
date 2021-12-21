import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client"
import { USER } from "../graphql/queries"
import { LOGIN } from "../graphql/mutations"

export const useAccount = () => {
  const { data } = useQuery(USER)
  const client = useApolloClient()

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: (response) => {
      // Store token
      localStorage.setItem("token", response.login.token)
    },
  })

  const logIn = async (email, password, callback) => {
    await login({
      variables: {
        email,
        password,
      },
    })

    await client.refetchQueries({
      include: [USER],
    })

    if (callback) {
      callback()
    }
  }

  const logOut = async (callback) => {
    localStorage.removeItem("token")
    await client.resetStore()

    if (callback) {
      callback()
    }
  }

  return { logIn, logOut, data }
}
