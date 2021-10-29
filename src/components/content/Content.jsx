import { Box, Container } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEMS } from "../../queries/queries"

import ItemCard from "./ItemCard"

const Content = () => {
  const { data } = useQuery(GET_ITEMS, {
    variables: { language: "FI" },
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
          }}
        >
          {data ? (
            data.allItems.map((i) => <ItemCard key={i.id} item={i} />)
          ) : (
            <p>loading...</p>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Content
