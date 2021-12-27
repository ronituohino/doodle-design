import { Box, Button, TextField } from "@mui/material"
import ContentCard from "../content/ContentCard"

const Coupons = () => {
  return (
    <ContentCard size={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", padding: 1, gap: "5px" }}>
        <TextField
          placeholder="Apply coupons"
          size="small"
          sx={{ width: "70%" }}
        ></TextField>
        <Button sx={{ width: "30%" }}>Apply</Button>
      </Box>
    </ContentCard>
  )
}

export default Coupons
