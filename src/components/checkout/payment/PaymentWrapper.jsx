import { useState } from "react"

import { Box } from "@mui/material"
import PaymentGroup from "./PaymentGroup"

const PaymentWrapper = () => {
  const [selectedPayment, setSelectedPayment] = useState(undefined)

  return (
    <>
      <PaymentGroup submit={() => console.log("ayuy")} />
      <Box sx={{ height: "20px" }} />
      <PaymentGroup />
    </>
  )
}

export default PaymentWrapper
