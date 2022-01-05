import { Box, Typography } from "@mui/material"

import FormikField from "../../general/formik/FormikField"
import FormikCheckbox from "../../general/formik/FormikCheckbox"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const HomeDeliveryAddress = ({ formik, sx }) => {
  return (
    <Box sx={{ ...sx }}>
      <FormikCheckbox formik={formik} field="useBillingAddress">
        <Typography sx={{ alignSelf: "center" }}>
          Use Billing Address as Delivery Address
        </Typography>
      </FormikCheckbox>

      {!formik.values.useBillingAddress && (
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
        </>
      )}

      <FormikAutoSave formik={formik} />
    </Box>
  )
}

export default HomeDeliveryAddress
