import { Box, Typography } from "@mui/material"
import PaymentMethod from "./PaymentMethod"

import danskebankLogo from "../../../images/payment_methods/danskebank.png"
import klarnaLogo from "../../../images/payment_methods/klarna.png"
import mastercardLogo from "../../../images/payment_methods/mastercard.png"
import mobilepayLogo from "../../../images/payment_methods/mobilepay.png"
import nordeaLogo from "../../../images/payment_methods/nordea.png"
import opLogo from "../../../images/payment_methods/op.png"
import paypalLogo from "../../../images/payment_methods/paypal.png"
import pivoLogo from "../../../images/payment_methods/pivo.png"
import spankkiLogo from "../../../images/payment_methods/spankki.png"
import visaLogo from "../../../images/payment_methods/visa.png"

// Create state in parent, an set value to selected
// and update function to submit
const PaymentGroup = ({
  groupName,
  hidden,
  submit,
  selected,

  danskebank,
  klarna,
  mastercard,
  mobilepay,
  nordea,
  op,
  paypal,
  pivo,
  spankki,
  visa,
}) => {
  const handleSelection = (name) => {
    submit(name)
  }

  return (
    <>
      {!hidden && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: 2,
          }}
        >
          <Typography sx={{ flexBasis: "100%" }}>
            {groupName}
          </Typography>

          {danskebank && (
            <PaymentMethod
              name="Danske Bank"
              imgSrc={danskebankLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {klarna && (
            <PaymentMethod
              name="Klarna"
              imgSrc={klarnaLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {mastercard && (
            <PaymentMethod
              name="Mastercard"
              imgSrc={mastercardLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {mobilepay && (
            <PaymentMethod
              name="MobilePay"
              imgSrc={mobilepayLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {nordea && (
            <PaymentMethod
              name="Nordea"
              imgSrc={nordeaLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {op && (
            <PaymentMethod
              name="OP"
              imgSrc={opLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {paypal && (
            <PaymentMethod
              name="PayPal"
              imgSrc={paypalLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {pivo && (
            <PaymentMethod
              name="Pivo"
              imgSrc={pivoLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {spankki && (
            <PaymentMethod
              name="S-Pankki"
              imgSrc={spankkiLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
          {visa && (
            <PaymentMethod
              name="Visa"
              imgSrc={visaLogo}
              selected={selected}
              selectThis={handleSelection}
            />
          )}
        </Box>
      )}
    </>
  )
}

export default PaymentGroup
