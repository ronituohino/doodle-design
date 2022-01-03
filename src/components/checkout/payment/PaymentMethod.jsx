import { Box } from "@mui/material"

const nonSelectedSx = {
  width: "150px",
  height: "150px",
  borderRadius: 4,
  cursor: "pointer",
  border: 4,
  borderColor: "lightgray",
}
const selectedSx = {
  width: "150px",
  height: "150px",
  borderRadius: 4,
  cursor: "pointer",
  border: 4,
  borderColor: "cornflowerblue",
}

const PaymentMethod = ({ name, imgSrc, selected, selectThis }) => {
  return (
    <Box
      onClick={() => selectThis(name)}
      sx={selected === name ? selectedSx : nonSelectedSx}
    >
      <img
        src={imgSrc}
        style={{ borderRadius: 16, width: "150px", height: "150px" }}
      />
    </Box>
  )
}

export default PaymentMethod
