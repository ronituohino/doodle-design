import { Box, Typography, Button } from "@mui/material"
import { useLanguage } from "../../../hooks/useLanguage"
import { getText } from "../../../utils/dictionary"

// Don't use language here, because not all points have "en" in them
const ParcelAddress = ({ point, selectCallback }) => {
  const { language } = useLanguage()
  const location = point.address.fi
  if (!location) {
    return <></>
  }

  return (
    <Box sx={{ display: "flex", width: "100%", margin: 2 }}>
      <Box sx={{ width: "75%" }}>
        <Typography
          sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
        >
          {point.publicName.fi}
        </Typography>
        <Typography
          sx={{
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {location.address ? location.address : location.streetName}
        </Typography>
        <Typography
          sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
        >
          {location.postalCode} {location.postalCodeName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "25%",
          alignSelf: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => selectCallback(point)}
        >
          {getText(language, "select")}
        </Button>
      </Box>
    </Box>
  )
}

export default ParcelAddress
