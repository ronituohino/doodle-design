import { matchPath } from "react-router"
import { useLocation } from "react-router-dom"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../graphql/queries"

import ProductList from "./ProductList"
import Loading from "../general/Loading"

const Products = () => {
  const { data, loading } = useQuery(GET_CATEGORIES)
  const location = useLocation()
  const urlCategoryName = matchPath(
    {
      path: "/:language/product/:category",
      exact: false,
      strict: false,
    },
    location.pathname
  ).params.category

  const category =
    data && data.getCategories
      ? data.getCategories.find((c) => c.urlPath === urlCategoryName)
      : undefined

  return (
    <>
      {loading ? (
        <Loading size={16} />
      ) : (
        <ProductList category={category} />
      )}
    </>
  )
}

export default Products
