import { Box, Paper, Typography } from "@mui/material"

const BetterPaper = ({ boxColor, helper, children, sx, innerSx }) => {
  const boxCol = boxColor ? boxColor : "lightgray"

  return (
    <Box sx={{ ...sx }}>
      <Paper
        variant="outlined"
        sx={{
          borderColor: boxCol,
          marginTop: -2.5,
          ...innerSx,
        }}
      >
        {children}
      </Paper>
      {helper && (
        <Typography variant="caption" color="crimson">
          {helper}
        </Typography>
      )}
    </Box>
  )
}

export default BetterPaper
