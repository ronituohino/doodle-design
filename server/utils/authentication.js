const accountTypes = require("../constants/accountTypes")
const { AuthenticationError } = require("apollo-server-express")

const isAccountType = (context) => {
  return {
    admin: context.currentAccount.accountType === accountTypes.ADMIN,
    customer:
      context.currentAccount.accountType === accountTypes.CUSTOMER,
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
