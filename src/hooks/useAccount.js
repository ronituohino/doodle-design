import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"

export const useAccount = (onComplete) => {
  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: (response) => {
      localStorage.setItem("token", response.login.token)
      onComplete()
    },
  })

  return { login }
}
