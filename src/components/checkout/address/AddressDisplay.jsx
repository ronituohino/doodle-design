import { Box, IconButton, Typography } from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"

const AddressDisplay = ({ address, enterEdit, disableEdit }) => {
  return (
    <Box sx={{ display: "flex", width: "100%", margin: 2 }}>
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
          {address.address}
        </Typography>
        <Typography
          sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
        >
          {address.postalcode} {address.city}
        </Typography>
        <Typography
          sx={{ wordWrap: "break-word", whiteSpace: "normal" }}
        >
          {address.company}
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
    </Box>
  )
}

export default AddressDisplay
