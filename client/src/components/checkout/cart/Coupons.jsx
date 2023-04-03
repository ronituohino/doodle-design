import { Box, Button, TextField } from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";
import LabelPaper from "../../general/LabelPaper";
import { getText } from "../../../utils/dictionary";

const Coupons = () => {
  const { language } = useLanguage();
  return (
    <LabelPaper
      label={getText(language, "coupons")}
      elevation={4}
      sx={{ width: "100%" }}
    >
      <Box sx={{ display: "flex", padding: 1, gap: "5px" }}>
        <TextField
          disabled
          placeholder="ABCD-1234..."
          size="small"
          sx={{ width: "70%" }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <Button disabled sx={{ width: "30%" }} variant="outlined">
          {getText(language, "apply")}
        </Button>
      </Box>
    </LabelPaper>
  );
};

export default Coupons;
