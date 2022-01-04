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

const PaymentGroup = ({ hidden, submit }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(undefined)

  const handleSelection = (name) => {
    if (!submit) {
      console.log("local")
      setSelectedPaymentMethod(name)
    } else {
      console.log("upper")
      submit(name)
    }
  }

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
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="Mastercard"
            imgSrc={mastercard}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="MobilePay"
            imgSrc={mobilepay}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="OP"
            imgSrc={op}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="PayPal"
            imgSrc={paypal}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="pivo"
            imgSrc={pivo}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="S-Pankki"
            imgSrc={spankki}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
          <PaymentMethod
            name="Visa"
            imgSrc={visa}
            selected={selectedPaymentMethod}
            selectThis={handleSelection}
          />
        </Box>
      )}
    </>
  )
}

export default PaymentGroup
