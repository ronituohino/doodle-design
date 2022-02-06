import { Box, Button, TextField, Paper } from "@mui/material"

const Coupons = () => {
  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
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
    </Paper>
  )
}

export default Coupons
