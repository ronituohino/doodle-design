import * as React from "react"

import FormikBox from "../FormikBox"

const FormikRadioGroup = ({
  formik,
  field,
  errorField,
  label,
  children,
  sx,
  innerSx,
}) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { formik, field })
    }
    return child
  })

  return (
    <FormikBox
      formik={formik}
      field={field}
      errorField={errorField}
      label={label}
      sx={sx}
      innerSx={innerSx}
    >
      {childrenWithProps}
    </FormikBox>
  )
}

export default FormikRadioGroup
