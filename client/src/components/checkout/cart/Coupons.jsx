import { Box, Button, TextField } from "@mui/material"
import LabelPaper from "../../general/LabelPaper"

const Coupons = () => {
  return (
    <LabelPaper label="Coupons" elevation={4} sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", padding: 1, gap: "5px" }}>
        <TextField
          disabled
          placeholder="ABCD-1234..."
          size="small"
          sx={{ width: "70%" }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <Button disabled sx={{ width: "30%" }} variant="outlined">
          Apply
        </Button>
      </Box>
    </LabelPaper>
  )
}

export default Coupons
