import { useHistory, useLocation } from "react-router-dom"
import { useLanguage } from "./useLanguage"

export const useRouting = () => {
  const history = useHistory()
  const { language } = useLanguage()
  const location = useLocation()

  const openLink = (link) => {
    history.push(link)
  }

  const back = () => {
    history.goBack()
  }

  const inCheckout = () => {
    return location.pathname.includes("checkout")
  }

  const homeLink = () => {
    return `/${language}/home`
  }

  const accountLink = () => {
    return `/${language}/account`
  }

  const categoryLink = (category) => {
    return `/${language}/product/${category}`
  }

  const productLink = (category, productId) => {
    return `/${language}/product/${category.toLowerCase()}/${productId}`
  }

  const checkoutLink = () => {
    return `/${language}/checkout/`
  }

  const loginLink = () => {
    return `/${language}/account/login`
  }

  const registerLink = () => {
    return `/${language}/account/register`
  }

  // ADMIN
  const adminLink = () => {
    return `/${language}/admin`
  }

  const productStatisticsLink = () => {
    return `/${language}/admin/products/statistics`
  }

  const productManageLink = () => {
    return `/${language}/admin/products/manage`
  }

  const productCategoriesLink = () => {
    return `/${language}/admin/products/categories`
  }

  const productCampaignsLink = () => {
    return `/${language}/admin/products/campaigns`
  }

  return {
    openLink,
    back,
    inCheckout,

    homeLink,
    accountLink,
    categoryLink,
    productLink,
    checkoutLink,
    loginLink,
    registerLink,

    adminLink,
    productStatisticsLink,
    productManageLink,
    productCategoriesLink,
    productCampaignsLink,
  }
}
