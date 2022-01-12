import * as React from "react"

import { Box } from "@mui/material"

const FormikRadioGroup = ({ formik, field, children, sx }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { formik, field })
    }
    return child
  })

  return <Box sx={sx}>{childrenWithProps}</Box>
}

export default FormikRadioGroup
