import { Box, Typography } from "@mui/material"

const Ratings = ({ tab, index }) => {
  return (
    <>
      {tab === index && (
        <Box sx={{ p: 2 }}>
          <Typography color="grey.500">
            Ratings not implemented yet...
          </Typography>
        </Box>
      )}
    </>
  )
}

export default Ratings
