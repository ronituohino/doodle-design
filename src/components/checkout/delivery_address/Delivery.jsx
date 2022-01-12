import { Button, Container } from "@mui/material"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import ParcelAddressSelection from "./ParcelAddressSelection"
import HomeDeliveryAddress from "./HomeDeliveryAddress"
import AddressDisplay from "./AddressDisplay"
import FormikAutoSave from "../../general/formik/FormikAutoSave"

const Delivery = ({ formik, next, checkout, constants, hidden }) => {
  const nextButtonDisabled =
    !checkout || !checkout.deliveryDetails || !formik.isValid

  return (
    <>
      {!hidden && (
        <Container maxWidth="md">
          <FormikRadioGroup
            formik={formik}
            field="deliveryMethod"
            label="Delivery Address"
            sx={{ marginBottom: 2 }}
          >
            <FormikRadioField value={constants.HOME_DELIVERY}>
              <FormikRadioAccordion
                title="Home Delivery"
                text="Delivery straight to your (or your friend's) doorstep"
              >
                <HomeDeliveryAddress formik={formik} />
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.POSTI_PARCEL}>
              <FormikRadioAccordion
                title="Posti Parcel"
                text="Delivery to a Posti pickup point"
              >
                {formik.values.postiParcelAddress && (
                  <AddressDisplay
                    elevation={12}
                    address={formik.values.postiParcelAddress}
                    enterEdit={() =>
                      formik.setFieldValue(
                        "postiParcelAddress",
                        undefined
                      )
                    }
                    sx={{ marginRight: 7 }}
                  />
                )}
                {!formik.values.postiParcelAddress && (
                  <ParcelAddressSelection
                    formik={formik}
                    setAddress={(values) =>
                      formik.setFieldValue(
                        "postiParcelAddress",
                        values
                      )
                    }
                  />
                )}
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.STORE_PICKUP}>
              <FormikRadioAccordion
                title="Pickup From Store"
                text="Fetch package from our store"
                price="100"
              >
                <AddressDisplay
                  elevation={12}
                  address={formik.values.storePickupAddress}
                  disableEdit
                  sx={{ marginRight: 7 }}
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
        </Container>
      )}
    </>
  )
}

export default Delivery
