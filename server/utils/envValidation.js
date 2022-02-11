const checkEnvironmentVariables = () => {
  const errors = []

  if (!process.env.DB_URI) {
    errors.push(
      "Missing .env variable DB_URI, set to MongoDB URI (String)\n"
    )
  }
  if (!process.env.JWT_SECRET) {
    errors.push(
      "Missing .env variable JWT_SECRET, set to a secret key (String) that is used to encrypt/decrypt tokens\n"
    )
  }

  if (errors.length > 0) {
    throw new Error(errors)
  }
}

module.exports = checkEnvironmentVariables
