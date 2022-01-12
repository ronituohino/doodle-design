import { Box, IconButton, Typography, Paper } from "@mui/material"

import Icon from "../../general/Icon"

const AddressDisplay = ({
  elevation,
  address,
  enterEdit,
  disableEdit,
  sx,
}) => {
  return (
    <>
      {address && (
        <Paper
          elevation={elevation}
          sx={{
            disply: "flex",
            flexWrap: "wrap",
            padding: 2,
            ...sx,
          }}
        >
          <Box sx={{ width: "70%" }}>
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
                alignSelf: "center",
              }}
            >
              <IconButton
                onClick={enterEdit}
                sx={{ width: 48, height: 48 }}
              >
                <Icon name="EditIcon" fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Paper>
      )}
    </>
  )
}

export default AddressDisplay
