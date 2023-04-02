import { InMemoryCache, makeVar } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartProducts: {
          read() {
            return cartProductsVar();
          },
        },

        getCategories: {
          merge: false,
        },
      },
    },
  },
  addTypename: false,
});

// If you call a reactive variable function with zero arguments
// (e.g., isLoggedInVar()),
// it returns the variable's current value.

// If you call the function with one argument
// (e.g., isLoggedInVar(false)),
// it replaces the variable's current value with the provided value.

export const cartProductsVar = makeVar([]);

export default cache;
