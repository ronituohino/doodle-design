const { AuthenticationError } = require("apollo-server-express")

const requireLogin = (context) => {
  if (!context.currentAccount) {
    throw new AuthenticationError("Not logged in, token invalid")
  }
}

const requireAdmin = (context) => {
  if (!context.currentAccount) {
    throw new AuthenticationError("Not logged in, token invalid")
  }

  if (context.currentAccount.accountType !== "Admin") {
    throw new AuthenticationError("Not an administrator account")
  }
}

module.exports = { requireLogin, requireAdmin }
