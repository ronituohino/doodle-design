import { Box, Pagination, Paper } from "@mui/material"

import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_ALL_ITEMS, GET_CATEGORIES } from "../../graphql/queries"

import { useLanguage } from "../../hooks/useLanguage"
import { matchPath } from "react-router"

import ItemCard from "./ItemCard"
import { useState } from "react"
import { useEffect } from "react"

const Content = () => {
  const { language } = useLanguage()
  const gc = useQuery(GET_CATEGORIES)

  const urlCategoryName = matchPath(location.pathname, {
    path: "/:language/product/:category",
    exact: false,
    strict: false,
  }).params.category

  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  const [getAllItems, { data, error }] = useLazyQuery(GET_ALL_ITEMS)

  // this is called whenever category is changed
  useEffect(() => {
    if (gc.data && gc.data.getCategories) {
      const category = gc.data.getCategories.find(
        (c) => c.name === urlCategoryName
      )

      getAllItems({
        variables: {
          language,
          category: category._id,
          currency: "EUR",
          page,
          size,
        },
      })
      setPage(0)
    }
  }, [gc.data, urlCategoryName])

  // callback from bottom pagination component
  const changePage = (event, value) => {
    setPage(value - 1) // backend pagination starts from 0
  }

  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
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
    </Paper>
  )
}

export default Content
