import { Box, Paper, Typography, Divider } from "@mui/material";

const LabelPaper = ({ label, elevation, variant, children, sx }) => {
  return (
    <Paper variant={variant} elevation={elevation} sx={sx}>
      {label && (
        <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
          <Typography
            variant="caption"
            underline="true"
            sx={{
              color: "text.secondary",
            }}
          >
            {label}
          </Typography>

          <Divider />
        </Box>
      )}

      <Box sx={{ p: 2, pt: 1 }}>{children}</Box>
    </Paper>
  );
};

export default LabelPaper;
