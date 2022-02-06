import { Box, Typography } from "@mui/material"

const CategorySubtitle = ({ text }) => {
  return (
    <Box sx={{ paddingTop: 2.73, paddingLeft: 2 }}>
      <Typography color="grey.700" variant="subtitle2">
        {text}
      </Typography>
    </Box>
  )
}

export default CategorySubtitle
