import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

const FormikRadioAccordion = ({ title, text, checked, children }) => {
  return (
    <Accordion
      expanded={checked}
      sx={{
        boxShadow: 0,
        width: "100%",
      }}
      disableGutters
    >
      <AccordionSummary>
        <Box>
          <Typography>{title}</Typography>
          <Typography variant="caption">{text}</Typography>
        </Box>
      </AccordionSummary>
      {children && <AccordionDetails>{children}</AccordionDetails>}
    </Accordion>
  );
};

export default FormikRadioAccordion;
