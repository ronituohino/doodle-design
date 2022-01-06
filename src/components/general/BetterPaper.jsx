import { Box, Paper, Typography } from "@mui/material"

const BetterPaper = ({
  boxColor,
  labelColor,
  label,
  helper,
  children,
  sx,
  innerSx,
}) => {
  const boxCol = boxColor ? boxColor : "lightgray"
  const labelCol = labelColor ? labelColor : "gray"

  return (
    <Box sx={{ ...sx }}>
      <Box
        sx={{
          display: "inline-block",
          paddingRight: 0.5,
          paddingLeft: 0.5,
          position: "relative",
          top: 10,
          left: 10,
          backgroundColor: "white",
        }}
      >
        <Typography variant="caption" color={labelCol}>
          {label}
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          borderColor: boxCol,
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
