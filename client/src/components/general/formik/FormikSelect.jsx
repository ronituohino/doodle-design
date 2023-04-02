import { TextField } from "@mui/material";
import { getInnerFieldFromObject, isString } from "../../../utils/utils";

const FormikSelect = ({
  formik,
  field,
  label,
  overrideValue,
  onChange,
  sx,
  children,
}) => {
  const value =
    overrideValue || overrideValue === ""
      ? overrideValue
      : getInnerFieldFromObject(formik.values, field);

  const error = getInnerFieldFromObject(formik.errors, field);
  const string = isString(error);

  return (
    <TextField
      select
      id={field}
      name={field}
      label={label}
      value={value}
      onChange={onChange ? e => onChange(e) : formik.handleChange}
      error={error !== undefined}
      helperText={string && error}
      InputLabelProps={{ shrink: true }}
      sx={sx}
    >
      {children}
    </TextField>
  );
};

export default FormikSelect;
