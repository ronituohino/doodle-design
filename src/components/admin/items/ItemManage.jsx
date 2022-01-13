import { useState } from "react"

import { Container, Button, Box } from "@mui/material"
import SearchBar from "../../top_bar/SearchBar"
import ModifyItemDialog from "./ModifyItemDialog"

const ItemManage = () => {
  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(6)

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 10,
        display: "flex",
        gap: "10px",
      }}
    >
      <ModifyItemDialog
        open={modifyDialogOpen}
        handleClose={() => setModifyDialogOpen(false)}
      />

      <SearchBar placeholder="Search" />
      <Button
        variant="contained"
        onClick={() => setModifyDialogOpen(true)}
      >
        Add item
      </Button>
    </Container>
  )
}

export default ItemManage
