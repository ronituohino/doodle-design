import { months } from "./constants"

export const formatPrice = (price, language, currency) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(price)
}

export const formatMonth = (month, language) => {
  return months[language][month]
}

export const formatTime = (hours, minutes) => {
  return `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }`
}
