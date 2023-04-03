import { Box, IconButton, Typography, Icon } from "@mui/material";

import LabelPaper from "./LabelPaper";

const AddressDisplay = ({
  elevation,
  variant,
  label,
  address,
  enterEdit,
  disableEdit,
  sx,
}) => {
  return (
    <>
      {address && (
        <LabelPaper
          label={label}
          variant={variant}
          elevation={elevation}
          sx={sx}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexBasis: "90%" }}>
              <Typography sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {address.firstName} {address.lastName}
              </Typography>
              <Typography
                sx={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  fontWeight: "bold",
                }}
              >
                {address.company}
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
              <Typography sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {address.zipCode} {address.city}
              </Typography>
              <Typography sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                {address.phone}
              </Typography>
            </Box>

            {!disableEdit && (
              <Box
                sx={{
                  flexBasis: "10%",
                  alignSelf: "center",
                }}
              >
                <IconButton onClick={enterEdit} sx={{ width: 48, height: 48 }}>
                  <Icon>edit</Icon>
                </IconButton>
              </Box>
            )}
          </Box>
        </LabelPaper>
      )}
    </>
  );
};

export default AddressDisplay;
