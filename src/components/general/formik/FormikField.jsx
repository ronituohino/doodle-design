import { TextField } from "@mui/material"
import { getInnerFieldFromObject } from "../../../utils/utils"
import { isString } from "../../../utils/utils"

const FormikField = ({
  field,
  label,
  type,
  formik,
  multiline,
  sx,
}) => {
  const value = getInnerFieldFromObject(formik.values, field)
  const error = getInnerFieldFromObject(formik.errors, field)

  const string = isString(error)

  return (
    <TextField
      fullWidth
      id={field}
      name={field}
      label={label}
      type={type ? type : "text"}
      value={value}
      onChange={formik.handleChange}
      error={string && Boolean(error)}
      helperText={string && error}
      InputLabelProps={{ shrink: true }}
      multiline={multiline}
      sx={sx}
    />
  )
}

export default FormikField
