import { TextField } from "@mui/material"

const FormikField = (props) => {
  return (
    <TextField
      fullWidth
      id={props.field}
      name={props.field}
      label={props.label}
      type={props.type ? props.type : "text"}
      value={props.formik.values[props.field]}
      onChange={props.formik.handleChange}
      error={
        props.formik.touched[props.field] &&
        Boolean(props.formik.errors[props.field])
      }
      helperText={
        props.formik.touched[props.field] &&
        props.formik.errors[props.field]
      }
      sx={{ marginBottom: 2, ...props.sx }}
      {...props}
    />
  )
}

export default FormikField
