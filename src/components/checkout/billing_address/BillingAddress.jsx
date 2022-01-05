import { Button } from "@mui/material"
import AddressForm from "./AddressForm"
import { useCheckout } from "../../../hooks/useCheckout"

const BillingAddress = ({ next }) => {
  const { data, setBillingDetails } = useCheckout()

  const handleAutoSave = (values) => {
    setBillingDetails(values)
  }

  const nextButtonDisabled =
    !data || !data.checkout || !data.checkout.billingDetails

  return (
    <>
      <AddressForm
        address={data.checkout.billingDetails}
        submit={handleAutoSave}
      />
      <Button
        fullWidth
        variant="contained"
        disabled={nextButtonDisabled}
        onClick={next}
      >
        Next
      </Button>
    </>
  )
}

export default BillingAddress
