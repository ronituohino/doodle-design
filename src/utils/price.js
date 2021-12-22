export const formatPrice = (price, language, currency) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(price)
}
