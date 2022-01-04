import { InMemoryCache, makeVar } from "@apollo/client"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
        checkout: {
          read() {
            return checkoutVar()
          },
        },
      },
    },
  },
})

// If you call a reactive variable function with zero arguments
// (e.g., isLoggedInVar()),
// it returns the variable's current value.

// If you call the function with one argument
// (e.g., isLoggedInVar(false)),
// it replaces the variable's current value with the provided value.

export const cartItemsVar = makeVar([])

export const checkoutVar = makeVar({
  billingDetails: undefined,
  deliveryDetails: undefined,
  paymentDetails: undefined,
})

export default cache
