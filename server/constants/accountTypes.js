const types = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
}

// Checks if string is a valid account type
const isAccountType = (string) => {
  return Object.values(types).includes(string)
}

module.exports = { types, isAccountType }
