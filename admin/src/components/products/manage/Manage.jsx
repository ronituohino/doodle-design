import { useState } from "react"

import { Box, Button } from "@mui/material"
import { useDebounce } from "use-debounce"
import SearchBar from "../../general/SearchBar"
import ProductDialog from "./dialog/ProductDialog"
import CategorySubtitle from "../../general/CategorySubtitle"
import ProductList from "./ProductList"

const Manage = () => {
  const [searchWord, setSearchWord] = useState("")
  const [debouncedSearchWord] = useDebounce(searchWord, 300)

  const [createProductDialogOpen, setCreateProductDialogOpen] =
    useState(false)

  return (
    <>
      <CategorySubtitle text="Manage" />
      <ProductDialog
        open={createProductDialogOpen}
        handleClose={() => setCreateProductDialogOpen(false)}
      />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: "10px",
        }}
      >
        <SearchBar
          placeholder="Filter"
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
        <Button
          variant="contained"
          onClick={() => setCreateProductDialogOpen(true)}
        >
          Create product
        </Button>
      </Box>

      <Box>
        <ProductList productSearchFilter={debouncedSearchWord} />
      </Box>
    </>
  )
}

export default Manage
