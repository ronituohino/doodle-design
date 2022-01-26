import { Box, Paper } from "@mui/material"
import { useState } from "react"
import ProductImage from "./ProductImage"

// eslint-disable-next-line
const ProductPictures = ({ product }) => {
  const [shownMainImage, setShownMainImage] = useState(0)

  return (
    <Paper elevation={4} sx={{ display: "flex", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          mr: 1,
        }}
      >
        <ProductImage index={0} onHover={setShownMainImage} />
        <ProductImage index={1} onHover={setShownMainImage} />
        <ProductImage index={2} onHover={setShownMainImage} />
      </Box>

      <Box>
        <img
          component="img"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          style={{
            width: "330px",
            height: "330px",
            borderRadius: 4,
          }}
        />
      </Box>
    </Paper>
  )
}

export default ProductPictures
