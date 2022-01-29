import { matchPath } from "react-router"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../graphql/queries"

import ProductList from "./ProductList"
import Loading from "../general/Loading"

const Products = () => {
  const { data, loading } = useQuery(GET_CATEGORIES)
  const urlCategoryName = matchPath(location.pathname, {
    path: "/:language/product/:category",
    exact: false,
    strict: false,
  }).params.category

  const category =
    data && data.getCategories
      ? data.getCategories.find((c) => c.name === urlCategoryName)
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
