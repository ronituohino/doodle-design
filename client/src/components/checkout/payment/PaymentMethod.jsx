import { Box, Typography } from "@mui/material"

const nonSelectedSx = {
  borderColor: "lightgray",
}
const selectedSx = {
  borderColor: "secondary.main",
}

const PaymentMethod = ({ name, imgSrc, selected, selectThis }) => {
  const sx = selected === name ? selectedSx : nonSelectedSx

  return (
    <Box
      onClick={() => selectThis(name)}
      sx={{ textAlign: "center", cursor: "pointer" }}
    >
      <Box
        sx={{ cursor: "pointer", border: 2, borderRadius: 2, ...sx }}
      >
        <img
          alt={name}
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
