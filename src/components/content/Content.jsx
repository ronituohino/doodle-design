import { Box, Container, Pagination } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ALL_ITEMS } from "../../queries/queries"

import { useLanguage } from "../../hooks/useLanguage"
import { useParams } from "react-router"

import ItemCard from "./ItemCard"

const Content = () => {
  const { language } = useLanguage()
  const { category } = useParams()

  const { data: itemData, error } = useQuery(GET_ALL_ITEMS, {
    variables: { language, category, currency: "EUR" },
  })

  return (
    <>
      <Container
        sx={{
          marginTop: 4,
        }}
      >
        {error ? (
          <p>something went wrong...</p>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {itemData ? (
                itemData.allItems.map((i) => (
                  <ItemCard key={i.id} item={i} />
                ))
              ) : (
                <p>loading...</p>
              )}
            </Box>

            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={10} />
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

export default Content
