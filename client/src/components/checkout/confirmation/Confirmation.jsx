import { Button } from "@mui/material"

import Cart from "../cart/Cart"
import AddressDisplay from "../../general/AddressDisplay"
import PaymentDisplay from "./PaymentDisplay"
import LabelPaper from "../../general/LabelPaper"
import FormikField from "../../general/formik/FormikField"

const Confirmation = ({
  formik,
  allValid,
  constants,
  next,
  checkout,
  hidden,
}) => {
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
                  ? "Your details & delivered to"
                  : "Your details"
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
                  isStorePickup ? "Pick up from" : "Delivered to"
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
            label="Extra information"
            elevation={4}
            sx={{ width: "100%" }}
          >
            <FormikField
              formik={formik}
              field="extrainfo"
              fullWidth
              multiline
              placeholder="If you have details you would like to add to your order, write them here"
            />
          </LabelPaper>

          <Button
            disabled={!allValid}
            fullWidth
            variant="contained"
            onClick={next}
          >
            Purchase
          </Button>
        </Cart>
      )}
    </>
  )
}

export default Confirmation
