import LabelPaper from "../../general/LabelPaper"
import { Typography } from "@mui/material"

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
    <LabelPaper
      label="Payment details"
      elevation={4}
      sx={{ width: "100%" }}
    >
      <Typography>Method: {paymentMethodText}</Typography>
      {paymentProviderText !== "" && (
        <Typography>Provider: {paymentProviderText}</Typography>
      )}
    </LabelPaper>
  )
}

export default PaymentDisplay
