import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Typography } from "@mui/material"
import { useEffect } from "react"

import FormikField from "../../general/formik/FormikField"
import FormikCheckbox from "../../general/formik/FormikCheckbox"

const HomeDeliveryAddress = ({ submit, address, sx }) => {
  const formik = useFormik({
    initialValues: {
      useBillingAddress: false,
      firstName: "Alex",
      lastName: "Jermikov",
      address: "Hämäläisentie 22",
      city: "HELSINKI",
      zipCode: "99922",
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
      <FormikCheckbox formik={formik} field="useBillingAddress">
        <Typography sx={{ alignSelf: "center" }}>
          Use Billing Address as Delivery Address
        </Typography>
      </FormikCheckbox>

      {!formik.values.useBillingAddress && (
        <>
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
        </>
      )}
    </Box>
  )
}

export default HomeDeliveryAddress
