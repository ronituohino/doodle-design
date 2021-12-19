import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const languageToIndex = (language) => {
  const list = ["en", "fi"]
  return list.indexOf(language)
}

export const currencyToIndex = (currency) => {
  const list = ["EUR"]
  return list.indexOf(currency)
}

export const getPagination = (page, size) => {
  const limit = size ? size : 3
  const offset = page ? page * limit : 0

  return { limit, offset }
}

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const createToken = (_id) => {
  const userToken = { _id }
  return { token: jwt.sign(userToken, process.env.JWT_SECRET) }
}
