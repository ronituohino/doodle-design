import { useFormik } from "formik"
import * as yup from "yup"

import { useState } from "react"

import { Box, Button } from "@mui/material"
import FormikRadioField from "../../general/formik/FormikRadioField"
import { useEffect } from "react"
import FormikRadioGroup from "../../general/formik/FormikRadioGroup"
import DeliveryMethod from "./DeliveryMethod"
import ParcelAddressSelection from "../address/ParcelAddressSelection"
import AddressFields from "../address/AddressFields"
import AddressDisplay from "../address/AddressDisplay"

const Delivery = ({ submit, billingAddress, delivery, sx }) => {
  const formik = useFormik({
    initialValues: {
      delivery: "",

      // These fields are reserved for home delivery,
      // other delivery methods use states down below
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "FI",
      extra: "",
      company: "",
    },
    validationSchema: yup.object({
      delivery: yup.string().required("Delivery method is required"),

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
      extra: yup.string(),
      company: yup.string(),
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
      <form onSubmit={formik.handleSubmit}>
        <FormikRadioGroup formik={formik} field="delivery">
          <FormikRadioField value="home-delivery">
            <DeliveryMethod
              title="Home Delivery"
              text="Delivery straight to your doorstep"
            >
              <AddressFields formik={formik} />
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
              />
            </DeliveryMethod>
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
