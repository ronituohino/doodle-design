import FormikField from "./FormikField"
import FormikBox from "./FormikBox"

import { Box } from "@mui/material"

import { getInnerFieldFromObject } from "../../../utils/utils"

const FormikFieldArray = ({
  formik,
  field,
  label,
  multiline,
  children,
  sx,
  ...props
}) => {
  const object = getInnerFieldFromObject(formik.values, field)

  return (
    <>
      <FormikBox label={label} sx={{ mb: 2 }}>
        <Box sx={sx}>
          {Object.keys(object).map((key) => {
            return (
              <FormikField
                key={key}
                formik={formik}
                field={`${field}.${key}`}
                label={key}
                multiline={multiline}
                sx={{ mb: 2 }}
                {...props}
              />
            )
          })}

          {children}
        </Box>
      </FormikBox>
    </>
  )
}

export default FormikFieldArray
