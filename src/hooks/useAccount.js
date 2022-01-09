import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client"
import { USER } from "../graphql/queries"
import { LOGIN } from "../graphql/mutations"
import { REGISTER } from "../graphql/mutations"

export const useAccount = () => {
  const { data } = useQuery(USER)
  const client = useApolloClient()

  const [registerMutation] = useMutation(REGISTER, {
    onError: (error) => {
      console.log(error)
      return undefined
    },
    onCompleted: (response) => {
      return response
    },
  })

  const [loginMutation] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
      return undefined
    },
    onCompleted: (response) => {
      return response
    },
  })

  const register = async (username, email, password, callback) => {
    const response = await registerMutation({
      variables: {
        username,
        email,
        password,
      },
    })

    if (response) {
      setToken(response.data.createUser.token)

      await client.refetchQueries({
        include: [USER],
      })

      if (callback) {
        callback()
      }
    }
  }

  const logIn = async (email, password, callback) => {
    const response = await loginMutation({
      variables: {
        email,
        password,
      },
    })

    if (response) {
      setToken(response.data.login.token)

      await client.refetchQueries({
        include: [USER],
      })

      if (callback) {
        callback()
      }
    }
  }

  const setToken = (token) => {
    localStorage.setItem("token", token)
  }

  const logOut = async (callback) => {
    localStorage.removeItem("token")
    await client.resetStore()

    if (callback) {
      callback()
    }
  }

  const loggedIn = () => {
    if (data && data.me) {
      return true
    }
    return false
  }

  return { register, logIn, logOut, data, loggedIn }
}
