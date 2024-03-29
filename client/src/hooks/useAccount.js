import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { ACCOUNT } from "../graphql/queries";
import { LOGIN } from "../graphql/mutations";
import { REGISTER } from "../graphql/mutations";

import { useSnackbar } from "notistack";

export const useAccount = callback => {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(ACCOUNT);
  const client = useApolloClient();

  const [registerMutation, registerData] = useMutation(REGISTER, {
    onError: error => {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
      return undefined;
    },
    onCompleted: response => {
      setToken(response.createAccount.token);

      client.resetStore();

      if (callback) {
        callback();
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  const [loginMutation, loginData] = useMutation(LOGIN, {
    onError: error => {
      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
      return undefined;
    },
    onCompleted: response => {
      setToken(response.login.token);

      client.resetStore();

      if (callback) {
        callback();
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  const register = (username, email, password) => {
    registerMutation({
      variables: {
        username,
        email,
        password,
      },
    });
  };

  const logIn = async (email, password) => {
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  const setToken = token => {
    localStorage.setItem("token", token);
  };

  const logOut = async callback => {
    localStorage.removeItem("token");
    await client.resetStore();

    if (callback) {
      callback();
    }
  };

  const loggedIn = () => {
    if (data && data.me) {
      return true;
    }
    return false;
  };

  return {
    register,
    registerData,
    logIn,
    loginData,
    logOut,
    data,
    loggedIn,
  };
};
