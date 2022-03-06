import { Box, Icon, Typography } from "@mui/material"

const PointIcon = ({ icon, text, textColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Icon
        sx={{
          fontSize: 48,
          border: "solid",
          borderRadius: 40,
          p: 1,
          alignSelf: "center",
        }}
      >
        {icon}
      </Icon>
      <Typography
        color={textColor}
        sx={{
          width: "128px",
          textAlign: "center",
          alignSelf: "center",
          mt: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}

export default PointIcon
