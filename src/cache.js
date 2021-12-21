import { InMemoryCache, makeVar } from "@apollo/client"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
      },
    },
  },
})

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar(!!localStorage.getItem("token"))

// If you call a reactive variable function with zero arguments
// (e.g., isLoggedInVar()),
// it returns the variable's current value.

// If you call the function with one argument
// (e.g., isLoggedInVar(false)),
// it replaces the variable's current value with the provided value.

// Initializes to an empty array
export const cartItemsVar = makeVar([])

export default cache
