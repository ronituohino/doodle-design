import { Box, Typography, Paper } from "@mui/material"

import FormikField from "../../general/formik/FormikField"
import FormikCheckbox from "../../general/formik/FormikCheckbox"

const HomeDeliveryAddress = ({ formik }) => {
  // Fixes tiny offset
  const paperPaddingBottom = formik.values.useExplicitDeliveryAddress
    ? { paddingBottom: 2 }
    : { paddingBottom: 1 }

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2, marginRight: 6, ...paperPaddingBottom }}
    >
      <FormikCheckbox
        formik={formik}
        field="useExplicitDeliveryAddress"
      >
        <Typography sx={{ alignSelf: "center" }}>
          Recipient is not me
        </Typography>
      </FormikCheckbox>

      {formik.values.useExplicitDeliveryAddress && (
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
            sx={{ marginBottom: 2 }}
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
