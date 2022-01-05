import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Button } from "@mui/material"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import ParcelAddressSelection from "./ParcelAddressSelection"
import HomeDeliveryAddress from "./HomeDeliveryAddress"
import AddressDisplay from "./AddressDisplay"
import { useCheckout } from "../../../hooks/useCheckout"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const HOME_DELIVERY = "home-delivery"
const POSTI_PARCEL = "posti-parcel"
const STORE_PICKUP = "store-pickup"

const Delivery = ({ next, sx }) => {
  const { data, setDeliveryDetails } = useCheckout()

  const formik = useFormik({
    initialValues: {
      deliveryMethod: "",

      // HOME_DELIVERY
      useBillingAddress: false,
      homeDeliveryAddress: {
        firstName: "lol",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "FI",
      },

      // POSTI_PARCEL
      postiParcelAddress: undefined,

      // STORE_PICKUP
      storePickupAddress: {
        extra: "Fred's Computers!",
        address: "Joukolankatu 12",
        city: "HELSINKI",
        zipCode: "00510",
        country: "FI",
      },
    },
    validationSchema: yup.object({
      deliveryMethod: yup
        .string()
        .required("Delivery method is required"),

      // HOME_DELIVERY
      useBillingAddress: yup.boolean(),
      homeDeliveryAddress: yup
        .object()
        .when(["deliveryMethod", "useBillingAddress"], {
          is: (deliveryMethod, useBillingAddress) =>
            deliveryMethod === HOME_DELIVERY && !useBillingAddress,
          then: yup.object({
            firstName: yup
              .string()
              .required("First name is required"),
            lastName: yup.string().required("Last name is required"),
            address: yup.string().required("Address is required"),
            city: yup.string().required("City is required"),
            zipCode: yup
              .string()
              .matches(/^[0-9]+$/, "Must be digits only")
              .min(5, "Must be 5 digits")
              .max(5, "Must be 5 digits")
              .required("Zip code is required"),
            country: yup.string().required("Country is required"),
          }),
        }),

      // POSTI_PARCEL
      postiParcelAddress: yup.object().when("deliveryMethod", {
        is: (deliveryMethod) => deliveryMethod === POSTI_PARCEL,
        then: yup.object().required("Please select parcel address"),
      }),

      // STORE_PICKUP
      storePickupAddress: yup.object(),
    }),
    onSubmit: (values) => {
      setDeliveryDetails(values)
    },
  })

  const nextButtonDisabled =
    !data || !data.checkout || !data.checkout.deliveryDetails

  return (
    <Box sx={{ ...sx }}>
      <FormikRadioGroup formik={formik} field="deliveryMethod">
        <FormikRadioField value={HOME_DELIVERY}>
          <FormikRadioAccordion
            title="Home Delivery"
            text="Delivery straight to your (or your friend's) doorstep"
          >
            <HomeDeliveryAddress formik={formik} />
          </FormikRadioAccordion>
        </FormikRadioField>

        <FormikRadioField value={POSTI_PARCEL}>
          <FormikRadioAccordion
            title="Posti Parcel"
            text="Delivery to a Posti pickup point"
          >
            {formik.values.postiParcelAddress && (
              <AddressDisplay
                address={formik.values.postiParcelAddress}
                enterEdit={() =>
                  formik.setFieldValue(
                    "postiParcelAddress",
                    undefined
                  )
                }
              />
            )}
            {!formik.values.postiParcelAddress && (
              <ParcelAddressSelection
                setAddress={(values) =>
                  formik.setFieldValue("postiParcelAddress", values)
                }
              />
            )}
          </FormikRadioAccordion>
        </FormikRadioField>

        <FormikRadioField value={STORE_PICKUP}>
          <FormikRadioAccordion
            title="Pickup From Store"
            text="Fetch package from our store"
            price="100"
          >
            <AddressDisplay
              address={formik.values.storePickupAddress}
              disableEdit
            />
          </FormikRadioAccordion>
        </FormikRadioField>
      </FormikRadioGroup>

      <FormikAutoSave formik={formik} />

      <Button
        color="primary"
        variant="contained"
        disabled={nextButtonDisabled}
        fullWidth
        onClick={next}
      >
        Next
      </Button>
    </Box>
  )
}

export default Delivery
