import { Box } from "@mui/material"

const ProductImage = ({ index, selected, onHover }) => {
  const thisSelected = selected === index
  return (
    <Box
      onMouseEnter={() => onHover(index)}
      sx={{ border: 2, borderRadius: 1 }}
    >
      <img
        alt="small selectable for preview"
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/7/76/Mozilla_Firefox_logo_2013.svg"
        style={{
          width: "75px",
          height: "75px",
          borderRadius: 4,
        }}
      />
    </Box>
  )
}

export default ProductImage