// This defines all the languages
// supported by the application

// Use ISO 639-1 format
const languages = ["en", "fi"]

const getMongoose = () => {
  const obj = {}
  languages.forEach((l) => {
    obj[l] = String
  })

  return obj
}

const getGql = () => {
  const obj = {}
  languages.forEach((l) => {
    obj[l] = "String!"
  })

  const regex = /"/gi
  return `${JSON.stringify(obj).replace(regex, "")}`
}
getGql()

module.exports = { languages, getMongoose, getGql }
