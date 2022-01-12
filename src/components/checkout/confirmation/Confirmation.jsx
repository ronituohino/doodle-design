import { Button } from "@mui/material"

import Cart from "../cart/Cart"
import AddressDisplay from "../delivery_address/AddressDisplay"
import PaymentDisplay from "./PaymentDisplay"

const Confirmation = ({
  allValid,
  constants,
  next,
  checkout,
  hidden,
}) => {
  const explicitDeliveryAddress =
    checkout.deliveryDetails.useExplicitDeliveryAddress

  let deliveryAddress = undefined
  let isStorePickup = false

  switch (checkout.deliveryDetails.deliveryMethod) {
    case constants.HOME_DELIVERY:
      deliveryAddress = explicitDeliveryAddress
        ? checkout.deliveryDetails.homeDeliveryAddress
        : checkout.billingDetails
      break
    case constants.POSTI_PARCEL:
      deliveryAddress = checkout.deliveryDetails.postiParcelAddress
      break
    case constants.STORE_PICKUP:
      isStorePickup = true
      deliveryAddress = checkout.deliveryDetails.storePickupAddress
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
                !explicitDeliveryAddress
                  ? "Your details & delivered to"
                  : "Your details"
              }
              disableEdit
              sx={{ width: "100%" }}
            />
          )}

          {checkout.deliveryDetails && explicitDeliveryAddress && (
            <AddressDisplay
              elevation={4}
              address={deliveryAddress}
              label={isStorePickup ? "Pick up from" : "Delivered to"}
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
