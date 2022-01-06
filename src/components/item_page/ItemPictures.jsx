import { Box } from "@mui/material"
import { useState } from "react"
import ItemImage from "./ItemImage"

// eslint-disable-next-line
const ItemPictures = ({ item, sx }) => {
  const [shownMainImage, setShownMainImage] = useState(0)

  console.log(shownMainImage)
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ItemImage index={0} onHover={setShownMainImage} />
        <ItemImage index={1} onHover={setShownMainImage} />
        <ItemImage index={2} onHover={setShownMainImage} />
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
    </Box>
  )
}

export default ItemPictures
