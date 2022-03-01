const { types } = require("../constants/accountTypes")
const { AuthenticationError } = require("apollo-server-express")

const isLoggedIn = (context) => {
  return (
    context &&
    context.currentAccount &&
    context.currentAccount.accountType
  )
}

// Returns object with account type booleans
// Checks what type is in context
const isAccountType = (context) => {
  const isLogged = isLoggedIn(context)

  return {
    admin: isLogged
      ? context.currentAccount.accountType === types.ADMIN
      : false,
    customer: isLogged
      ? context.currentAccount.accountType === types.CUSTOMER
      : false,
    none: !isLogged,
  }
}

const requireLogin = (context) => {
  if (!context.currentAccount) {
    throw new AuthenticationError("Not logged in, token invalid")
  }
}

const requireAdmin = (context) => {
  if (!context.currentAccount) {
    throw new AuthenticationError("Not logged in, token invalid")
  }

  if (!isAccountType(context).admin) {
    throw new AuthenticationError("Not an administrator account")
  }
}

module.exports = {
  isAccountType,
  requireLogin,
  requireAdmin,
}
