import { useState } from "react"

import { Box } from "@mui/material"
import PaymentMethod from "./PaymentMethod"

const Payment = ({ hidden }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(undefined)

  return (
    <>
      {!hidden && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <PaymentMethod
            name="MobilePay"
            imgSrc="https://www.mobilepay.fi/mobilepaymedia/mobilepay-fi/images/news/original-photos/mplogo-1600x1200.jpg?mw=1400&hash=443768EA2360C969642EB9FE0F3045E81343ABA0"
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
        </Box>
      )}
    </>
  )
}

export default Payment
