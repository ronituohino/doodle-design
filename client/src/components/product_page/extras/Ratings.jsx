import { Box, Typography } from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

const Ratings = ({ tab, index }) => {
  const { language } = useLanguage();
  return (
    <>
      {tab === index && (
        <Box sx={{ p: 2 }}>
          <Typography color="grey.500">
            {getText(language, "ratingsNotImplemented")}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Ratings;
