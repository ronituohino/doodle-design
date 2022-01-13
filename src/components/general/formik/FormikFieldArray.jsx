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
}) => {
  const object = getInnerFieldFromObject(formik.values, field)

  return (
    <>
      <FormikBox
        formik={formik}
        field={field}
        label={label}
        sx={{ mb: 2 }}
      >
        <Box sx={sx}>
          {Object.keys(object).map((key) => (
            <FormikField
              key={key}
              label={key}
              formik={formik}
              field={`${field}.${key}`}
              multiline={multiline}
              sx={{ mb: 2 }}
            />
          ))}

          {children}
        </Box>
      </FormikBox>
    </>
  )
}

export default FormikFieldArray
