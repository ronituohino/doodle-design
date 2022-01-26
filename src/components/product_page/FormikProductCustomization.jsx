import { TextField, MenuItem } from "@mui/material"

const selectStyle = {
  marginBottom: 2,
  minWidth: "200px",
}

const FormikProductCustomization = ({
  formik,
  product,
  language,
}) => {
  return (
    <>
      {[...Array(product.customization.length)].map((x, i) => {
        const c = product.customization[i]
        const labelText = c.label[language]

        const value = formik.values[i]
        const valueText = value.option ? value.option[language] : ""

        return (
          <TextField
            select
            id={labelText}
            key={labelText}
            label={labelText}
            value={valueText}
            onChange={(e) => {
              const option = c.options.find(
                (o) => o[language] === e.target.value
              )

              formik.setValues([{ label: c.label, option }])
            }}
            error={
              formik.touched[labelText] &&
              Boolean(formik.errors[labelText])
            }
            helperText={
              formik.touched[labelText] && formik.errors[labelText]
            }
            sx={selectStyle}
          >
            {c.options.map((o) => {
              const text = o[language]
              return (
                <MenuItem key={text} value={text}>
                  {text}
                </MenuItem>
              )
            })}
          </TextField>
        )
      })}
    </>
  )
}

export default FormikProductCustomization
