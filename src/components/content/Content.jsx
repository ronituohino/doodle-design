import { Box, Container, Pagination } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEMS, LANGUAGE } from "../../queries/queries"

import ItemCard from "./ItemCard"

const Content = () => {
  const { data: languageData } = useQuery(LANGUAGE)
  const { data: itemData } = useQuery(GET_ITEMS, {
    variables: { language: languageData.language },
  })

  return (
    <>
      <Container
        sx={{
          marginTop: 4,
        }}
      >
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
      </Container>
    </>
  )
}

export default Content
