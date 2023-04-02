import { useNavigate } from "react-router-dom";
import { useLanguage } from "./useLanguage";

export const useRouting = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const openLink = link => {
    navigate(link);
  };

  const back = () => {
    navigate(-1);
  };

  const adminLink = () => {
    return `/${language}/`;
  };

  const productStatisticsLink = () => {
    return `/${language}/products/statistics`;
  };

  const productManageLink = () => {
    return `/${language}/products/manage`;
  };

  const productCategoriesLink = () => {
    return `/${language}/products/categories`;
  };

  const productCampaignsLink = () => {
    return `/${language}/products/campaigns`;
  };

  const userManageLink = () => {
    return `/${language}/accounts/manage`;
  };

  return {
    openLink,
    back,

    adminLink,
    productStatisticsLink,
    productManageLink,
    productCategoriesLink,
    productCampaignsLink,

    userManageLink,
  };
};
