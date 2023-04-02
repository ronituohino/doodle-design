import { Button, Container, Box } from "@mui/material";
import FormikRadioField from "../../general/formik/radio/FormikRadioField";
import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup";
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion";
import ParcelAddressSelection from "./ParcelAddressSelection";
import HomeDeliveryAddress from "./HomeDeliveryAddress";
import AddressDisplay from "../../general/AddressDisplay";
import FormikAutoSave from "../../general/formik/FormikAutoSave";
import FormikField from "../../general/formik/FormikField";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

const Delivery = ({ formik, next, checkout, constants, hidden }) => {
  const { language } = useLanguage();
  const nextButtonDisabled =
    !checkout || !checkout.deliveryDetails || !formik.isValid;

  return (
    <>
      {!hidden && (
        <Container maxWidth="md">
          <FormikRadioGroup
            formik={formik}
            field="deliveryMethod"
            sx={{ mb: 2 }}
          >
            <FormikRadioField value={constants.HOME_DELIVERY}>
              <FormikRadioAccordion
                title={getText(language, "homeDelivery")}
                text={getText(language, "homeDeliveryDetails")}
              >
                <HomeDeliveryAddress formik={formik} />
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.POSTI_PARCEL}>
              <FormikRadioAccordion
                title={getText(language, "postiParcel")}
                text={getText(language, "postiParcelDetails")}
              >
                {formik.values.postiParcelAddress && (
                  <AddressDisplay
                    variant="outlined"
                    address={formik.values.postiParcelAddress}
                    enterEdit={() =>
                      formik.setFieldValue("postiParcelAddress", undefined)
                    }
                    sx={{ mr: 26 }}
                  />
                )}
                {!formik.values.postiParcelAddress && (
                  <ParcelAddressSelection
                    formik={formik}
                    setAddress={values =>
                      formik.setFieldValue("postiParcelAddress", values)
                    }
                  />
                )}
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.STORE_PICKUP}>
              <FormikRadioAccordion
                title={getText(language, "pickupFromStore")}
                text={getText(language, "pictupFromStoreDetails")}
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
              label={getText(language, "phoneNumberPackageTracking")}
              sx={{ maxWidth: "50%", mt: 1, mb: 2 }}
            />

            <Button
              color="secondary"
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
              {getText(language, "next")}
            </Button>
          </Box>

          <FormikAutoSave formik={formik} />
        </Container>
      )}
    </>
  );
};

export default Delivery;
