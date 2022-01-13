const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// lowercase strings
const languageToIndex = (language) => {
  const list = ["en", "fi"]
  return list.indexOf(language)
}

// languageString = { EN: "...", FI: "..."}
const createLanguageList = (languageString) => {
  const list = []

  Object.keys(languageString).forEach((key) => {
    const index = languageToIndex(key.toLowerCase())
    list[index] = languageString[key]
  })

  return list
}

// UPPERCASE STRINGS
const currencyToIndex = (currency) => {
  const list = ["EUR"]
  return list.indexOf(currency)
}

// currencryString = { EUR: "..."}
const createCurrencyList = (currencyString) => {
  const list = []

  Object.keys(currencyString).forEach((key) => {
    const index = currencyToIndex(key.toUpperCase())
    list[index] = currencyString[key]
  })

  return list
}

const formatCustomization = (inputCustomization) => {
  const newCustomization = []

  inputCustomization.forEach((c) => {
    const newObj = {}
    newObj.label = createLanguageList(c.label)

    const optionsArr = []
    c.options.forEach((o) => {
      optionsArr.push(createLanguageList(o))
    })
    newObj.options = optionsArr

    newCustomization.push(newObj)
  })

  console.log(newCustomization)
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

const streamToBase64 = (stream) => {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("base64"))
    )
  })
}

module.exports = {
  languageToIndex,
  createLanguageList,
  currencyToIndex,
  createCurrencyList,
  formatCustomization,

  getPagination,
  hashPassword,
  createToken,
  streamToBase64,
}
