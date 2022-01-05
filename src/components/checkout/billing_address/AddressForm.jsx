import { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

import { Box } from "@mui/material"

import FormikField from "../../general/formik/FormikField"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const AddressForm = ({ address, submit, sx }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "Alex",
      lastName: "Jermikov",
      address: "Hämäläisentie 22",
      city: "HELSINKI",
      zipCode: "",
      country: "FI",
      company: "softaajat",
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
      <Box sx={{ display: "flex", gap: "15px", marginBottom: 2 }}>
        <FormikField
          formik={formik}
          field="firstName"
          label="First Name"
          sx={{ width: "50%" }}
        />

        <FormikField
          formik={formik}
          field="lastName"
          label="Last Name"
          sx={{ width: "50%" }}
        />
      </Box>

      <FormikField formik={formik} field="address" label="Address" />

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

      <FormikField formik={formik} field="company" label="Company" />

      <FormikAutoSave formik={formik} />
    </Box>
  )
}

export default AddressForm
