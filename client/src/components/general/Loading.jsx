import { CircularProgress, Box } from "@mui/material";

const Loading = ({ size, sx }) => {
  return (
    <Box sx={sx}>
      <CircularProgress color="inherit" size={size} />
    </Box>
  );
};

export default Loading;
