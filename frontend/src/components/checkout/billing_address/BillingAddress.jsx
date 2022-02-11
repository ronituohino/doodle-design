import { Container, Button } from "@mui/material"

import { Box, Paper } from "@mui/material"

import FormikField from "../../general/formik/FormikField"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const BillingAddress = ({ formik, next, checkout, hidden }) => {
  const nextButtonDisabled =
    !checkout || !checkout.billingDetails || !formik.isValid

  return (
    <>
      {!hidden && (
        <Container maxWidth="sm">
          <Paper elevation={4} sx={{ marginBottom: 2, padding: 3 }}>
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
            />

            <FormikAutoSave formik={formik} />
          </Paper>

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
