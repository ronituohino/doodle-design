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

  const categoryLink = (category) => {
    return `/${language}/product/${category}`
  }

  const itemLink = (category, itemId) => {
    return `/${language}/product/${category.toLowerCase()}/${itemId}`
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

  const itemStatisticsLink = () => {
    return `/${language}/admin/items/statistics`
  }

  const itemManageLink = () => {
    return `/${language}/admin/items/manage`
  }

  const itemCategoriesLink = () => {
    return `/${language}/admin/items/categories`
  }

  const itemCampaignsLink = () => {
    return `/${language}/admin/items/campaigns`
  }

  return {
    openLink,
    back,
    inCheckout,

    homeLink,
    categoryLink,
    itemLink,
    checkoutLink,
    loginLink,
    registerLink,

    adminLink,
    itemStatisticsLink,
    itemManageLink,
    itemCategoriesLink,
    itemCampaignsLink,
  }
}
