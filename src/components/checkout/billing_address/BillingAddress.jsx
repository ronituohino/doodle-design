import { Button } from "@mui/material"
import AddressForm from "./AddressForm"
import { useCheckout } from "../../../hooks/useCheckout"

const BillingAddress = ({ next, hidden }) => {
  const { data, setBillingDetails } = useCheckout()

  const handleAutoSave = (values) => {
    setBillingDetails(values)
  }

  const disabled =
    !data || !data.checkout || !data.checkout.billingDetails

  return (
    <>
      {!hidden && (
        <>
          <AddressForm submit={handleAutoSave} />
          <Button
            fullWidth
            variant="contained"
            disabled={disabled}
            onClick={next}
          >
            Next
          </Button>
        </>
      )}
    </>
  )
}

export default BillingAddress
