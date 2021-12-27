import { useHistory } from "react-router-dom"
import { useLanguage } from "./useLanguage"

export const useRouting = () => {
  const history = useHistory()
  const { language } = useLanguage()

  const back = () => {
    history.goBack()
  }

  const homeLink = () => {
    return `/${language}/home`
  }
  const openHome = () => {
    history.push(homeLink())
  }

  const categoryLink = (category) => {
    return `/${language}/product/${category}`
  }
  const openCategory = (category) => {
    history.push(categoryLink(category))
  }

  const itemLink = (category, itemId) => {
    return `/${language}/product/${category.toLowerCase()}/${itemId}`
  }
  const openItem = (category, itemId) => {
    history.push(itemLink(category, itemId))
  }

  const checkoutCartLink = () => {
    return `/${language}/checkout/cart`
  }
  const openCheckoutCart = () => {
    history.push(checkoutCartLink())
  }

  const checkoutAddressLink = () => {
    return `/${language}/checkout/address`
  }
  const openCheckoutAddress = () => {
    history.push(checkoutAddressLink())
  }

  const loginLink = () => {
    return `/${language}/account/login`
  }
  const openLogin = () => {
    history.push(loginLink())
  }

  const registerLink = () => {
    return `/${language}/account/register`
  }
  const openRegister = () => {
    history.push(registerLink())
  }

  return {
    back,

    homeLink,
    openHome,

    categoryLink,
    openCategory,

    itemLink,
    openItem,

    checkoutCartLink,
    openCheckoutCart,

    checkoutAddressLink,
    openCheckoutAddress,

    loginLink,
    openLogin,

    registerLink,
    openRegister,
  }
}
