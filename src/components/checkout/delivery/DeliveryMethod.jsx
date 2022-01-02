import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"

const DeliveryMethod = ({
  title,
  text,
  price,
  checked,
  children,
}) => {
  return (
    <Accordion
      expanded={checked}
      sx={{ boxShadow: 0 }}
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
  )
}

export default DeliveryMethod
