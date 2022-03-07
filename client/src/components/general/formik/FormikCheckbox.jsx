import { Box, Checkbox } from "@mui/material"
import * as React from "react"

const FormikCheckbox = ({ formik, field, children }) => {
  const checked = formik.values[field]
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { checked })
    }
    return child
  })

  return (
    <Box
      onClick={() => formik.setFieldValue(field, !checked)}
      sx={{
        display: "flex",
        flexBasis: "100%",
        marginBottom: 1,
        cursor: "pointer",
      }}
    >
      <Checkbox
        id={field}
        name={field}
        checked={checked}
        value={checked}
        disableRipple
        color="secondary"
      />

      {childrenWithProps}
    </Box>
  )
}

export default FormikCheckbox
