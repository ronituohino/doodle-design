import BetterPaper from "../../general/BetterPaper"
import { Typography, Box } from "@mui/material"

const PaymentDisplay = ({ checkout, constants }) => {
  let paymentMethodText = ""
  let paymentProviderText = ""
  switch (checkout.paymentDetails.paymentMethod) {
    case constants.PREPAYMENT:
      paymentMethodText = "Prepayment"
      paymentProviderText = checkout.paymentDetails.prePayment
      break
    case constants.INSTALLMENT:
      paymentMethodText = "Installment"
      paymentProviderText = checkout.paymentDetails.installment
      break
    case constants.LOCAL_PAYMENT:
      paymentMethodText = "Pay at the store"
      break
  }
  return (
    <BetterPaper
      label="Payment details"
      sx={{ width: "100%" }}
      innerSx={{ padding: 2 }}
    >
      <Box>
        <Typography>Method: {paymentMethodText}</Typography>
        <Typography>Provider: {paymentProviderText}</Typography>
      </Box>
    </BetterPaper>
  )
}

export default PaymentDisplay
