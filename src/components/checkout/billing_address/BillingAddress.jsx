import { Container, Button, Paper } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box } from "@mui/material"

import { useEffect } from "react"

import FormikField from "../../general/formik/FormikField"
import FormikAutoSave from "../../general/formik/FormikAutoSave"
import BetterPaper from "../../general/BetterPaper"

const BillingAddress = ({
  next,
  checkout,
  setters,
  setError,
  hidden,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "Jeremy",
      lastName: "Jenking",
      address: "Tampereenkatu 12",
      city: "TAMPERE",
      zipCode: "05001",
      country: "FI",
      company: "",
      phone: "0504802233",
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
      phone: yup
        .string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(10, "Must be 10 digits")
        .max(10, "Must be 10 digits"),
    }),
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: false,
  })

  // Used to set checkout errors
  useEffect(() => {
    setError(formik.isValid)
  }, [formik.isValid])

  const nextButtonDisabled =
    !checkout || !checkout.billingDetails || !formik.isValid

  return (
    <>
      {!hidden && (
        <Container maxWidth="sm">
          <BetterPaper
            label="Billing Address"
            sx={{ marginBottom: 2 }}
            innerSx={{ padding: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                marginBottom: 2,
                width: "100%",
              }}
            >
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

            <FormikField
              formik={formik}
              field="address"
              label="Address"
              sx={{ marginBottom: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                marginBottom: 2,
                width: "100%",
              }}
            >
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
              sx={{ marginBottom: 2 }}
            />

            <FormikField
              formik={formik}
              field="phone"
              label="Phone Number (for package tracking)"
            />

            <FormikAutoSave
              formik={formik}
              onSave={() => {
                setters.setBillingDetails(formik.values)
              }}
            />
          </BetterPaper>

          <Button
            fullWidth
            variant="contained"
            disabled={nextButtonDisabled}
            onClick={next}
          >
            Next
          </Button>
        </Container>
      )}
    </>
  )
}

export default BillingAddress
