import { Box, Button, TextField } from "@mui/material"
import BetterPaper from "../../general/BetterPaper"

const Coupons = () => {
  return (
    <BetterPaper
      sx={{ width: "100%" }}
      variant="outlined"
      label="Coupons"
    >
      <Box sx={{ display: "flex", padding: 1, gap: "5px" }}>
        <TextField
          placeholder="ABCD-1234..."
          size="small"
          sx={{ width: "70%" }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <Button sx={{ width: "30%" }} variant="outlined">
          Apply
        </Button>
      </Box>
    </BetterPaper>
  )
}

export default Coupons
