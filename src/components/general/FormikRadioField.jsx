import { Radio, Box } from "@mui/material"

const FormikRadioField = ({ formik, field, content, value }) => {
  return (
    <Box sx={{ display: "flex", margin: 1 }}>
      <Radio
        id={field}
        name={field}
        checked={formik.values[field] === value}
        onClick={formik.handleChange}
        value={value}
      />

      {content}
    </Box>
  )
}

export default FormikRadioField
