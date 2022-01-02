import { Box, Typography } from "@mui/material"

const DeliveryMethod = ({ title, text, price }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>{title}</Typography>
      <Typography>{text}</Typography>
    </Box>
  )
}

export default DeliveryMethod
