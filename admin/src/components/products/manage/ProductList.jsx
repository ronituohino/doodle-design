import { List, Box, Pagination, Divider } from "@mui/material"

import { useLazyQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../../../graphql/queries"

import Loading from "../../general/Loading"
import ProductLine from "./ProductLine"
import { useState } from "react"
import { useEffect } from "react"
import { useLanguage } from "../../../hooks/useLanguage"

const ProductList = ({ category }) => {
  const { language } = useLanguage()
  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  const [getProducts, { data, error }] = useLazyQuery(GET_PRODUCTS)

  // this is called whenever category is changed
  useEffect(() => {
    getProducts({
      variables: {
        category: category ? category._id : null,
        page,
        size,
      },
    })
    setPage(0)
    // eslint-disable-next-line
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
          <List>
            {!data && <Loading size={16} />}
            {data &&
              data.getProducts.docs.map((p) => (
                <ProductLine
                  key={p._id}
                  product={p}
                  language={language}
                />
              ))}
            <Divider variant="middle" />
          </List>

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
