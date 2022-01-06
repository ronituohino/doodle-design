import { Box, IconButton, Typography } from "@mui/material"
import BetterPaper from "../../general/BetterPaper"

import EditIcon from "@mui/icons-material/Edit"

const AddressDisplay = ({
  label,
  address,
  enterEdit,
  disableEdit,
  sx,
  innerSx,
}) => {
  return (
    <>
      {address && (
        <BetterPaper
          label={label}
          variant="outlined"
          sx={sx}
          innerSx={{ ...innerSx, display: "flex" }}
        >
          <Box sx={{ width: "75%" }}>
            <Typography
              sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              {address.firstName} {address.lastName}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                whiteSpace: "normal",
                fontWeight: "bold",
              }}
            >
              {address.extra}
            </Typography>
            <Typography
              sx={{
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {address.address}
            </Typography>
            <Typography
              sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              {address.zipCode} {address.city}
            </Typography>
            <Typography
              sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              {address.company}
            </Typography>
            <Typography
              sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              {address.phone}
            </Typography>
          </Box>
          {!disableEdit && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "25%",
                alignSelf: "center",
              }}
            >
              <IconButton
                onClick={enterEdit}
                sx={{ width: 48, height: 48 }}
              >
                <EditIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </BetterPaper>
      )}
    </>
  )
}

export default AddressDisplay
