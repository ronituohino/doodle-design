const accountTypes = require("../constants/accountTypes")
const { AuthenticationError } = require("apollo-server-express")

const isLoggedIn = (context) => {
  return (
    context &&
    context.currentAccount &&
    context.currentAccount.accountType
  )
}

const isAccountType = (context) => {
  const isLogged = isLoggedIn(context)

  return {
    admin: isLogged
      ? context.currentAccount.accountType === accountTypes.ADMIN
      : false,
    customer: isLogged
      ? context.currentAccount.accountType === accountTypes.CUSTOMER
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
  accountTypes,
  isAccountType,
  requireLogin,
  requireAdmin,
}
