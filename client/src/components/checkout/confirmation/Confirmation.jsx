import { Button } from "@mui/material"

import Cart from "../cart/Cart"
import AddressDisplay from "../../general/AddressDisplay"
import PaymentDisplay from "./PaymentDisplay"
import LabelPaper from "../../general/LabelPaper"
import FormikField from "../../general/formik/FormikField"
import { useLanguage } from "../../../hooks/useLanguage"
import { getText } from "../../../utils/dictionary"

const Confirmation = ({
  formik,
  allValid,
  constants,
  next,
  checkout,
  hidden,
}) => {
  const { language } = useLanguage()
  let deliveryAddress = undefined

  const explicitDeliveryAddress =
    checkout.deliveryDetails.useExplicitDeliveryAddress
  let postiParcel = false
  let isStorePickup = false

  switch (checkout.deliveryDetails.deliveryMethod) {
    case constants.HOME_DELIVERY:
      deliveryAddress = explicitDeliveryAddress
        ? checkout.deliveryDetails.homeDeliveryAddress
        : checkout.billingDetails
      break
    case constants.POSTI_PARCEL:
      postiParcel = true
      deliveryAddress = checkout.deliveryDetails.postiParcelAddress
      break
    case constants.STORE_PICKUP:
      isStorePickup = true
      deliveryAddress = checkout.deliveryDetails.storePickupAddress
      break
    default:
      break
  }

  return (
    <>
      {!hidden && (
        <Cart hideControls>
          {checkout.billingDetails && (
            <AddressDisplay
              elevation={4}
              address={checkout.billingDetails}
              label={
                !explicitDeliveryAddress &&
                !isStorePickup &&
                !postiParcel
                  ? getText(language, "yourDetailsAndDeliveredTo")
                  : getText(language, "yourDetails")
              }
              disableEdit
              sx={{ width: "100%" }}
            />
          )}

          {checkout.deliveryDetails &&
            (explicitDeliveryAddress ||
              isStorePickup ||
              postiParcel) && (
              <AddressDisplay
                elevation={4}
                address={deliveryAddress}
                label={
                  isStorePickup
                    ? getText(language, "pickUpFrom")
                    : getText(language, "deliveredTo")
                }
                disableEdit
                sx={{ width: "100%" }}
              />
            )}

          {checkout.paymentDetails && (
            <PaymentDisplay
              checkout={checkout}
              constants={constants}
            />
          )}

          <LabelPaper
            label={getText(language, "extraInformation")}
            elevation={4}
            sx={{ width: "100%" }}
          >
            <FormikField
              formik={formik}
              field="extrainfo"
              fullWidth
              multiline
              placeholder={getText(
                language,
                "extraInformationDetails"
              )}
            />
          </LabelPaper>

          <Button
            disabled={!allValid}
            fullWidth
            variant="contained"
            onClick={next}
          >
            {getText(language, "purchase")}
          </Button>
        </Cart>
      )}
    </>
  )
}

export default Confirmation
