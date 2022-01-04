import { useState } from "react"

import { Box } from "@mui/material"
import PaymentMethod from "./PaymentMethod"

import danskebank from "../../../images/payment_methods/danskebank.png"
import mastercard from "../../../images/payment_methods/mastercard.png"
import mobilepay from "../../../images/payment_methods/mobilepay.png"
import op from "../../../images/payment_methods/op.png"
import paypal from "../../../images/payment_methods/paypal.png"
import pivo from "../../../images/payment_methods/pivo.png"
import spankki from "../../../images/payment_methods/spankki.png"
import visa from "../../../images/payment_methods/visa.png"

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
            name="Danske Bank"
            imgSrc={danskebank}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="Mastercard"
            imgSrc={mastercard}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="MobilePay"
            imgSrc={mobilepay}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="OP"
            imgSrc={op}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="PayPal"
            imgSrc={paypal}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="pivo"
            imgSrc={pivo}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="S-Pankki"
            imgSrc={spankki}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
          <PaymentMethod
            name="Visa"
            imgSrc={visa}
            selected={selectedPaymentMethod}
            selectThis={setSelectedPaymentMethod}
          />
        </Box>
      )}
    </>
  )
}

export default Payment
