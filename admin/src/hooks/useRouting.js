import { useNavigate } from "react-router-dom"
import { useLanguage } from "./useLanguage"

export const useRouting = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()

  const openLink = (link) => {
    navigate(link)
  }

  const back = () => {
    navigate(-1)
  }

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

    adminLink,
    productStatisticsLink,
    productManageLink,
    productCategoriesLink,
    productCampaignsLink,
  }
}
