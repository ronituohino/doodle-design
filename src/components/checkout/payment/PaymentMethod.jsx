import { Box, Typography } from "@mui/material"

const nonSelectedSx = {
  width: "100px",
  height: "100px",
  borderRadius: 2,
  cursor: "pointer",
  border: 2,
  borderColor: "lightgray",
}
const selectedSx = {
  width: "100px",
  height: "100px",
  borderRadius: 2,
  cursor: "pointer",
  border: 2,
  borderColor: "cornflowerblue",
}

const PaymentMethod = ({ name, imgSrc, selected, selectThis }) => {
  return (
    <Box
      onClick={() => selectThis(name)}
      sx={{ textAlign: "center", cursor: "pointer" }}
    >
      <Box sx={selected === name ? selectedSx : nonSelectedSx}>
        <img
          src={imgSrc}
          style={{
            borderRadius: 8,
            width: "100px",
            height: "100px",
          }}
        />
      </Box>
      <Typography variant="caption">{name}</Typography>
    </Box>
  )
}

export default PaymentMethod
