const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const languageToIndex = (language) => {
  const list = ["en", "fi"]
  return list.indexOf(language)
}

const currencyToIndex = (currency) => {
  const list = ["EUR"]
  return list.indexOf(currency)
}

const getPagination = (page, size) => {
  const limit = size ? size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const createToken = (_id) => {
  const userToken = { _id }
  return { token: jwt.sign(userToken, process.env.JWT_SECRET) }
}

module.exports = {
  languageToIndex,
  currencyToIndex,
  getPagination,
  hashPassword,
  createToken,
}
