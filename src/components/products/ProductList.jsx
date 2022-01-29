import { Box, Pagination } from "@mui/material"

import { useLazyQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../../graphql/queries"

import { useLanguage } from "../../hooks/useLanguage"

import Loading from "../general/Loading"
import ProductCard from "./ProductCard"
import { useState } from "react"
import { useEffect } from "react"

const ProductList = ({ category }) => {
  const { language } = useLanguage()

  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  const [getProducts, { data, error }] = useLazyQuery(GET_PRODUCTS)

  console.log(data)
  // this is called whenever category is changed
  useEffect(() => {
    console.log(category)
    getProducts({
      variables: {
        language,
        category: category ? category._id : "",
        currency: "EUR",
        page,
        size,
      },
    })
    setPage(0)
  }, [category])

  // callback from bottom pagination component
  const changePage = (event, value) => {
    setPage(value - 1) // backend pagination starts from 0
  }

  return (
    <>
      {error && <p>something went wrong...</p>}
      {!error && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {!data && <Loading size={16} />}
            {data &&
              data.getProducts.docs.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
          </Box>

          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data && (
              <Pagination
                count={data.getProducts.totalPages}
                page={page + 1} // backend pagination starts from 0
                onChange={changePage}
              />
            )}
          </Box>
        </>
      )}
    </>
  )
}

export default ProductList
