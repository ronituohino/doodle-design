import { Box } from "@mui/material"
import { getFile } from "../../../utils/getFile"
import { useTheme } from "@emotion/react"

// For use with react-window FixedSizeList
export const renderRow = ({ index, style, data }) => {
  return (
    <Box sx={style}>
      <ProductPicture
        key={data.product.images[index]._id}
        index={index}
        selected={data.shownMainImage}
        setMainImage={data.setShownMainImage}
        setModalOpen={data.setImageModalOpen}
        image={data.product.images[index]}
      />
    </Box>
  )
}

const ProductPicture = ({
  index,
  selected,
  setMainImage,
  setModalOpen,
  image,
}) => {
  const theme = useTheme()
  const thisSelected = selected === index
  return (
    <Box>
      <img
        alt="small selectable for preview"
        component="img"
        src={getFile(image._id, image.filename)}
        style={{
          width: "75px",
          height: "75px",
          cursor: "pointer",
          border: `3px solid ${
            thisSelected ? theme.palette.secondary.main : "#00000000"
          }`,
          borderRadius: 4,
        }}
        onMouseEnter={() => setMainImage(index)}
        onClick={() => setModalOpen(true)}
      />
    </Box>
  )
}

export default ProductPicture
