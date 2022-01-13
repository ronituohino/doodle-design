import { Box, Typography } from "@mui/material"
import { getInnerFieldFromObject } from "../../../utils/utils"

const FormikBox = ({ formik, field, label, children, sx }) => {
  const error =
    formik && field
      ? getInnerFieldFromObject(formik.errors, field)
      : undefined

  return (
    <Box sx={{ ...sx, mt: -2.5 }}>
      <Box
        sx={{
          display: "inline-block",
          paddingRight: 0.5,
          paddingLeft: 0.5,
          position: "relative",
          top: 10,
          left: 10,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="caption"
          color={error ? "error.main" : "grey.700"}
        >
          {label}
        </Typography>
      </Box>

      <Box
        variant="outlined"
        sx={{
          border: 1,
          borderRadius: 1,
          borderColor: error ? "error.main" : "grey.400",
          p: 2,
          pb: 0,
        }}
      >
        {children}
      </Box>
      {error && (
        <Box sx={{ textIndent: 16 }}>
          <Typography variant="caption" color="error.main">
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FormikBox
