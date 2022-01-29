const checkEnvironmentVariables = () => {
  if (!process.env.DB_URI) {
    throw new Error("Missing .env variable DB_URI, set to MongoDB URI")
  }
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "Missing .env variable JWT_SECRET, set to a secret key that is used to encrypt/decrypt tokens"
    )
  }
  if (!process.env.BACKEND_PORT) {
    throw new Error(
      "Missing .env variable BACKEND_PORT, set to a port number that users connect to"
    )
  }
}

module.exports = checkEnvironmentVariables
