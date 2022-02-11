import FormikBox from "../../../general/formik/FormikBox"
import FormikFieldArray from "../../../general/formik/FormikFieldArray"
import FormikField from "../../../general/formik/FormikField"

import { Button, Box, IconButton, Icon } from "@mui/material"

const FormikCustomization = ({ formik, label, field }) => {
  const customization = formik.values[field]

  return (
    <FormikBox label={label} sx={{ pt: 2 }}>
      {customization.map((customizationObject, index) => (
        <Box key={`customization-${index}`} sx={{ mb: 2 }}>
          <FormikFieldArray
            formik={formik}
            field={`${field}.${index}.label`}
            label="Label"
            sx={{ display: "flex", gap: "15px" }}
          >
            <IconButton
              onClick={() => {
                const arr = [...formik.values.customization]

                arr.splice(index, 1)

                formik.setValues({
                  ...formik.values,
                  customization: arr,
                })
              }}
              sx={{ alignSelf: "center", pb: 3 }}
              disableRipple
            >
              <Icon name="ClearIcon" />
            </IconButton>
          </FormikFieldArray>

          <FormikBox label="Options" sx={{ pl: 2, pr: 2 }}>
            {customizationObject.options.map(
              (option, optionIndex) => (
                <Box
                  key={`options-${optionIndex}`}
                  sx={{
                    display: "flex",
                    gap: "15px",
                    mb: 2,
                  }}
                >
                  {Object.keys(option).map((key) => (
                    <Box key={key}>
                      <FormikField
                        label={key}
                        formik={formik}
                        field={`${field}.${index}.options.${optionIndex}.${key}`}
                      />
                    </Box>
                  ))}

                  <IconButton
                    onClick={() => {
                      const arr = [
                        ...formik.values.customization[index].options,
                      ]

                      arr.splice(optionIndex, 1)

                      const newValues = { ...formik.values }
                      newValues.customization[index].options = arr

                      formik.setValues(newValues)
                    }}
                    sx={{ alignSelf: "center" }}
                    disableRipple
                  >
                    <Icon>clear</Icon>
                  </IconButton>
                </Box>
              )
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                ml: -6.5,
                pb: 1,
              }}
            >
              <IconButton
                onClick={() => {
                  const arr = [...formik.values.customization]
                  arr[index].options.push({
                    en: "",
                    fi: "",
                  })

                  formik.setValues({
                    ...formik.values,
                    customization: arr,
                  })
                }}
                disableRipple
              >
                <Icon>add</Icon>
              </IconButton>
            </Box>
          </FormikBox>
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          ml: -6.5,
          pb: 1,
        }}
      >
        <Button
          onClick={() => {
            const arr = [...formik.values.customization]
            arr.push({
              label: { en: "", fi: "" },
              options: [{ en: "", fi: "" }],
            })
            formik.setValues({ ...formik.values, customization: arr })
          }}
          variant="outlined"
        >
          Add customization
        </Button>
      </Box>
    </FormikBox>
  )
}

export default FormikCustomization
