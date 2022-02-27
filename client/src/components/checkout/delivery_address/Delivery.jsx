import { Button, Container, Box } from "@mui/material"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import ParcelAddressSelection from "./ParcelAddressSelection"
import HomeDeliveryAddress from "./HomeDeliveryAddress"
import AddressDisplay from "../../general/AddressDisplay"
import FormikAutoSave from "../../general/formik/FormikAutoSave"
import FormikField from "../../general/formik/FormikField"

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
            sx={{ mb: 2 }}
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
                    variant="outlined"
                    address={formik.values.postiParcelAddress}
                    enterEdit={() =>
                      formik.setFieldValue(
                        "postiParcelAddress",
                        undefined
                      )
                    }
                    sx={{ mr: 26 }}
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
                  variant="outlined"
                  address={formik.values.storePickupAddress}
                  disableEdit
                  sx={{ mr: 26 }}
                />
              </FormikRadioAccordion>
            </FormikRadioField>
          </FormikRadioGroup>

          <Box sx={{ display: "flex" }}>
            <FormikField
              formik={formik}
              field="phone"
              label="Phone number (package tracking)"
              sx={{ maxWidth: "50%", mt: 1, mb: 2 }}
            />

            <Button
              color="primary"
              variant="contained"
              disabled={nextButtonDisabled}
              fullWidth
              onClick={next}
              sx={{
                ml: 2,
                alignSelf: "center",
                height: "56px",
                mb: 1,
              }}
            >
              Next
            </Button>
          </Box>

          <FormikAutoSave formik={formik} />
        </Container>
      )}
    </>
  )
}

export default Delivery
