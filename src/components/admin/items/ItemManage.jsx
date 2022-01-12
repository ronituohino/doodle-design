import { useState } from "react"

import { Container, Button, Box } from "@mui/material"
import SearchBar from "../../top_bar/SearchBar"

const ItemManage = () => {
  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 10,
        display: "flex",
      }}
    >
      <SearchBar placeholder="Search" />
      <Button onClick={() => console.log("hel")}>Add item</Button>
    </Container>
  )
}

export default ItemManage
