import { TextField } from "@mui/material"
import { getInnerFieldFromObject } from "../../../utils/utils"

const FormikField = ({ field, label, type, formik, sx }) => {
  const value = getInnerFieldFromObject(formik.values, field)
  const error = getInnerFieldFromObject(formik.errors, field)
  const touched = getInnerFieldFromObject(formik.touched, field)

  return (
    <TextField
      fullWidth
      id={field}
      name={field}
      label={label}
      type={type ? type : "text"}
      value={value}
      onChange={formik.handleChange}
      error={touched && Boolean(error)}
      helperText={touched && error}
      InputLabelProps={{ shrink: true }}
      sx={{ marginBottom: 2, ...sx }}
    />
  )
}

export default FormikField
