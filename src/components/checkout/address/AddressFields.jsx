import { Box } from "@mui/material"
import FormikField from "../../general/formik/FormikField"

export const AddressFields = ({ formik }) => {
  return (
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
    </>
  )
}

export default AddressFields
