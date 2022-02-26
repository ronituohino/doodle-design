export const formatPrice = (price, language, currency) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(price)
}

const months = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  fi: [
    "Tammikuu",
    "Helmikuu",
    "Maaliskuu",
    "Huhtikuu",
    "Toukokuu",
    "Kesäkuu",
    "Heinäkuu",
    "Elokuu",
    "Syyskuu",
    "Lokakuu",
    "Marraskuu",
    "Joulukuu",
  ],
}

export const formatMonth = (month, language) => {
  return months[language][month]
}
