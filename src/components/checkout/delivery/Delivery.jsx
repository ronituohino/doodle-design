import { useFormik } from "formik"
import * as yup from "yup"

import { useState } from "react"

import { Box, Button } from "@mui/material"
import FormikRadioField from "../../general/formik/FormikRadioField"
import { useEffect } from "react"
import FormikRadioGroup from "../../general/formik/FormikRadioGroup"
import DeliveryMethod from "./DeliveryMethod"
import ParcelAddressSelection from "../delivery_address/ParcelAddressSelection"
import HomeDeliveryAddress from "../delivery_address/HomeDeliveryAddress"
import AddressDisplay from "../delivery_address/AddressDisplay"

const Delivery = ({ submit, billingAddress, delivery, sx }) => {
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

  const [explicitBillingAddress, setExplicitBillingAddress] =
    useState(undefined)

  useEffect(() => {
    console.log("val")
    formik.validateForm().then((c) => console.log(c))
  }, [])

  const setPostiParcel = (values) => {
    setPostiParcelAddress({
      firstName: billingAddress.firstName,
      lastName: billingAddress.lastName,
      ...values,
      company: billingAddress.company,
    })
  }
  const [postiParcelAddress, setPostiParcelAddress] =
    useState(undefined)

  return (
    <Box sx={{ ...sx }}>
      <FormikRadioGroup formik={formik} field="delivery">
        <FormikRadioField value="home-delivery">
          <DeliveryMethod
            title="Home Delivery"
            text="Delivery straight to your (or your friend's) doorstep"
          >
            <HomeDeliveryAddress
              submit={(values) => setExplicitBillingAddress(values)}
              address={explicitBillingAddress}
            />
          </DeliveryMethod>
        </FormikRadioField>

        <FormikRadioField value="posti-parcel">
          <DeliveryMethod
            title="Posti Parcel"
            text="Delivery to a Posti pickup point"
          >
            {postiParcelAddress && (
              <AddressDisplay
                address={postiParcelAddress}
                enterEdit={() => setPostiParcelAddress(undefined)}
              />
            )}
            {!postiParcelAddress && (
              <ParcelAddressSelection setAddress={setPostiParcel} />
            )}
          </DeliveryMethod>
        </FormikRadioField>

        <FormikRadioField value="store-pickup">
          <DeliveryMethod
            title="Pickup From Store"
            text="Fetch package from our store"
            price="100"
          >
            <AddressDisplay
              address={{
                firstName: billingAddress.firstName,
                lastName: billingAddress.lastName,
                extra: "Fred's Computers!",
                address: "Suometsäntie 66",
                zipCode: "00650",
                city: "HELSINKI",
                company: billingAddress.company,
              }}
              disableEdit
            />
          </DeliveryMethod>
        </FormikRadioField>
      </FormikRadioGroup>

      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
      >
        Save
      </Button>
    </Box>
  )
}

export default Delivery
