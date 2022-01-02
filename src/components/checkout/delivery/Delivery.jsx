import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Button } from "@mui/material"
import FormikRadioField from "../../general/formik/FormikRadioField"
import { useEffect } from "react"
import FormikRadioGroup from "../../general/formik/FormikRadioGroup"
import DeliveryMethod from "./DeliveryMethod"
import AddressForm from "../address/AddressForm"
import ParcelAddressSelection from "../address/ParcelAddressSelection"

const Delivery = ({ submit, delivery, sx }) => {
  const formik = useFormik({
    initialValues: {
      delivery: "",
    },
    validationSchema: yup.object({
      delivery: yup.string().required("Delivery method is required"),
    }),
    onSubmit: (values) => {
      submit(values)
    },
  })

  useEffect(() => {
    if (delivery) {
      if (Object.keys(delivery).length > 1) {
        formik.setValues(delivery)
      }
    }
  }, [delivery])

  return (
    <Box sx={{ ...sx }}>
      <form onSubmit={formik.handleSubmit}>
        <FormikRadioGroup formik={formik} field="delivery">
          <FormikRadioField value="home-delivery">
            <DeliveryMethod
              title="Home Delivery"
              text="Delivery straight to your doorstep"
            >
              <AddressForm />
            </DeliveryMethod>
          </FormikRadioField>

          <FormikRadioField value="posti-parcel">
            <DeliveryMethod
              title="Posti Parcel"
              text="Delivery to a Posti pickup point"
            >
              <ParcelAddressSelection />
            </DeliveryMethod>
          </FormikRadioField>

          <FormikRadioField value="store-pickup">
            <DeliveryMethod
              title="Pickup From Store"
              text="Fetch package from our store"
              price="100"
            ></DeliveryMethod>
          </FormikRadioField>
        </FormikRadioGroup>

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

export default Delivery
