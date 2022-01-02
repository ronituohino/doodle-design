import { Box, Typography } from "@mui/material"
import * as React from "react"

const FormikRadioGroup = ({ formik, field, label, children }) => {
  const error = formik.touched[field] && Boolean(formik.errors[field])
  const boxColor = error ? "crimson" : "lightgray"
  const boxColorBold = error ? "crimson" : "gray"

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { formik, field })
    }
    return child
  })
  return (
    <Box sx={{ marginBottom: 2, marginTop: -2.5 }}>
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
        <Typography variant="caption" color={boxColorBold} sx={{}}>
          {label}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          border: 1,
          borderColor: boxColor,
          borderRadius: 1,
        }}
      >
        {childrenWithProps}
      </Box>
      {error && (
        <Typography variant="caption" color="crimson">
          {formik.errors[field]}
        </Typography>
      )}
    </Box>
  )
}

export default FormikRadioGroup
