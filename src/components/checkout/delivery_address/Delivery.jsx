import { useFormik } from "formik"
import * as yup from "yup"

import { useState } from "react"

import { Box, Button } from "@mui/material"
import FormikRadioField from "../../general/formik/FormikRadioField"
import { useEffect } from "react"
import FormikRadioGroup from "../../general/formik/FormikRadioGroup"
import DeliveryMethod from "./DeliveryMethod"
import ParcelAddressSelection from "./ParcelAddressSelection"
import HomeDeliveryAddress from "./HomeDeliveryAddress"
import AddressDisplay from "./AddressDisplay"

const HOME_DELIVERY = "home-delivery"
const POSTI_PARCEL = "posti-parcel"
const STORE_PICKUP = "store-pickup"

const Delivery = ({ submit, billingAddress, sx, hidden }) => {
  const formik = useFormik({
    initialValues: {
      delivery: "",
    },
    validationSchema: yup.object({
      delivery: yup.string().required("Delivery method is required"),
    }),
    onSubmit: (values) => {
      // Before submitting,
      // check that selected subfields are correct
      // and add them to the return object
      let valid = false
      if (
        values.delivery === HOME_DELIVERY &&
        explicitBillingAddress
      ) {
        values = { ...values, ...explicitBillingAddress }
        valid = true
      } else if (
        values.delivery === POSTI_PARCEL &&
        postiParcelAddress
      ) {
        values = { ...values, ...postiParcelAddress }
        valid = true
      } else if (values.delivery === STORE_PICKUP) {
        valid = true
      } else {
        formik.setFieldError("delivery", "Delivery info not complete")
      }

      if (valid) {
        submit(values)
      }
    },
  })

  const [explicitBillingAddress, setExplicitBillingAddress] =
    useState(undefined)

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

  const [storePickupAddress, setStorePickupAddress] =
    useState(undefined)

  useEffect(() => {
    if (billingAddress) {
      setStorePickupAddress({
        firstName: billingAddress.firstName,
        lastName: billingAddress.lastName,
        extra: "Fred's Computers!",
        address: "Suometsäntie 66",
        zipCode: "00650",
        city: "HELSINKI",
        company: billingAddress.company,
      })
    }
  }, [billingAddress])

  return (
    <>
      {!hidden && (
        <Box sx={{ ...sx }}>
          <FormikRadioGroup formik={formik} field="delivery">
            <FormikRadioField value={HOME_DELIVERY}>
              <DeliveryMethod
                title="Home Delivery"
                text="Delivery straight to your (or your friend's) doorstep"
              >
                <HomeDeliveryAddress
                  submit={(values) =>
                    setExplicitBillingAddress(values)
                  }
                  address={explicitBillingAddress}
                />
              </DeliveryMethod>
            </FormikRadioField>

            <FormikRadioField value={POSTI_PARCEL}>
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
                  <ParcelAddressSelection
                    setAddress={setPostiParcel}
                  />
                )}
              </DeliveryMethod>
            </FormikRadioField>

            <FormikRadioField value={STORE_PICKUP}>
              <DeliveryMethod
                title="Pickup From Store"
                text="Fetch package from our store"
                price="100"
              >
                {storePickupAddress && (
                  <AddressDisplay
                    address={storePickupAddress}
                    disableEdit
                  />
                )}
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
      )}
    </>
  )
}

export default Delivery
