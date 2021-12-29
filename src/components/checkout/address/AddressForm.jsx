import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Button } from "@mui/material"
import FormikField from "../../general/FormikField"
import { useEffect } from "react"

const AddressForm = ({ submit, address, sx }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "FI",
      company: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      zipCode: yup
        .string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(5, "Must be 5 digits")
        .max(5, "Must be 5 digits")
        .required("Postal code is required"),
      country: yup.string().required("Country is required"),
      company: yup.string(),
    }),
    onSubmit: (values) => {
      submit(values)
    },
  })

  useEffect(() => {
    if (address) {
      if (Object.keys(address).length > 1) {
        formik.setValues(address)
      }
    }
  }, [address])

  return (
    <Box sx={{ ...sx }}>
      <form onSubmit={formik.handleSubmit}>
        <FormikField
          formik={formik}
          field="firstName"
          label="First Name"
        />

        <FormikField
          formik={formik}
          field="lastName"
          label="Last Name"
        />

        <FormikField
          formik={formik}
          field="address"
          label="Address"
        />

        <Box sx={{ display: "flex", gap: "15px", marginBottom: 2 }}>
          <FormikField
            formik={formik}
            field="zipCode"
            label="Zip Code"
            sx={{ width: "40%" }}
          />
          <FormikField
            formik={formik}
            field="city"
            label="City"
            sx={{ width: "60%" }}
          />
        </Box>

        <FormikField
          formik={formik}
          field="company"
          label="Company"
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  )
}

export default AddressForm
