import { Box, Button, TextField, Paper } from "@mui/material"

const Coupons = () => {
  return (
    <Paper sx={{ width: "100%" }} variant="outlined">
      <Box sx={{ display: "flex", padding: 1, gap: "5px" }}>
        <TextField
          label="Coupons"
          placeholder="ABCD-1234..."
          size="small"
          sx={{ width: "70%" }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <Button sx={{ width: "30%" }} variant="outlined">
          Apply
        </Button>
      </Box>
    </Paper>
  )
}

export default Coupons
