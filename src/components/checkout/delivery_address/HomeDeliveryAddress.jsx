import { Box, Typography, Paper } from "@mui/material"

import FormikField from "../../general/formik/FormikField"
import FormikCheckbox from "../../general/formik/FormikCheckbox"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const HomeDeliveryAddress = ({ formik }) => {
  return (
    <Paper sx={{ padding: 2, width: "60%" }} variant="outlined">
      <FormikCheckbox formik={formik} field="useBillingAddress">
        <Typography sx={{ alignSelf: "center" }}>
          Recipient is not me
        </Typography>
      </FormikCheckbox>

      {formik.values.useBillingAddress && (
        <>
          <Box sx={{ display: "flex", gap: "15px", marginBottom: 2 }}>
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.firstName"
              label="First Name"
              sx={{ width: "50%" }}
            />

            <FormikField
              formik={formik}
              field="homeDeliveryAddress.lastName"
              label="Last Name"
              sx={{ width: "50%" }}
            />
          </Box>

          <FormikField
            formik={formik}
            field="homeDeliveryAddress.address"
            label="Address"
          />

          <Box sx={{ display: "flex", gap: "15px", marginBottom: 2 }}>
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.zipCode"
              label="Zip Code"
              sx={{ width: "40%" }}
            />
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.city"
              label="City"
              sx={{ width: "60%" }}
            />
          </Box>

          <FormikField
            formik={formik}
            field="homeDeliveryAddress.phone"
            label="Phone Number (for package tracking)"
          />
        </>
      )}
    </Paper>
  )
}

export default HomeDeliveryAddress
