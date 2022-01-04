import { useState } from "react"
import { Button } from "@mui/material"
import AddressForm from "./AddressForm"

const BillingAddress = ({ submit, hidden }) => {
  const [billing, setBilling] = useState(undefined)

  const handleAutoSave = (values) => {
    setBilling(values)
  }

  return (
    <>
      {!hidden && (
        <>
          <AddressForm submit={handleAutoSave} />
          <Button
            disabled={billing === undefined}
            onClick={submit(billing)}
          >
            Next
          </Button>
        </>
      )}
    </>
  )
}

export default BillingAddress
