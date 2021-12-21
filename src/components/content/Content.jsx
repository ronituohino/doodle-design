import { Box, Container, Pagination } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ALL_ITEMS } from "../../graphql/queries"

import { useLanguage } from "../../hooks/useLanguage"
import { useParams, matchPath } from "react-router"

import ItemCard from "./ItemCard"
import { useState } from "react"
import { useEffect } from "react"

const Content = () => {
  const { language } = useLanguage()
  const { category } = useParams()

  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  const { data, error } = useQuery(GET_ALL_ITEMS, {
    variables: { language, category, currency: "EUR", page, size },
  })

  // this is called whenever category is changed
  useEffect(() => {
    setPage(0)
  }, [
    matchPath(location.pathname, {
      path: "/:language/product/:category",
      exact: false,
      strict: false,
    }).params.category,
  ])

  // callback from bottom pagination component
  const changePage = (event, value) => {
    setPage(value - 1) // backend pagination starts from 0
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginTop: 4,
        }}
      >
        {error && <p>something went wrong...</p>}
        {!error && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {!data && <p>loading...</p>}
              {data &&
                data.getItems.docs.map((i) => (
                  <ItemCard key={i._id} item={i} />
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
                  count={data.getItems.totalPages}
                  page={page + 1} // backend pagination starts from 0
                  onChange={changePage}
                />
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

export default Content
