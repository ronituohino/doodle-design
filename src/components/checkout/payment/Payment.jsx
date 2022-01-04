import { useFormik } from "formik"
import * as yup from "yup"

import { useState } from "react"
import { Box, Button } from "@mui/material"

const PREPAYMENT = "prepayment"
const INSTALLMENT = "installment"
const LOCAL_PAYMENT = "local-payment"

import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import PaymentGroup from "./PaymentGroup"

const Payment = ({ delivery, submit, hidden, sx }) => {
  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
    },
    validationSchema: yup.object({
      paymentMethod: yup
        .string()
        .required("Payment method is required"),
    }),
    onSubmit: (values) => {
      // Before submitting,
      // check that selected subfields are correct
      // and add them to the return object

      if (values.paymentMethod === PREPAYMENT && selectedPrePayment) {
        const returnValues = { ...values, selectedPrePayment }
        submit(returnValues)
      } else if (
        values.paymentMethod === INSTALLMENT &&
        selectedInstallment
      ) {
        const returnValues = { ...values, selectedInstallment }
        submit(returnValues)
      } else if (values.paymentMethod === LOCAL_PAYMENT) {
        submit(values)
      } else {
        formik.setFieldError(
          "paymentMethod",
          "Payment info not complete"
        )
      }
    },
  })

  // Prepayment state
  const [selectedPrePayment, setSelectedPrePayment] =
    useState(undefined)

  // Installment state
  const [selectedInstallment, setSelectedInstallment] =
    useState(undefined)

  return (
    <>
      {!hidden && (
        <Box sx={{ ...sx }}>
          <FormikRadioGroup formik={formik} field="paymentMethod">
            <FormikRadioField value={PREPAYMENT}>
              <FormikRadioAccordion
                title="Prepayment"
                text="Payment using a card, banking applications, or payment services"
              >
                <>
                  <PaymentGroup
                    groupName="Bank Payment"
                    submit={(name) => setSelectedPrePayment(name)}
                    selected={selectedPrePayment}
                    op
                    danskebank
                    spankki
                    nordea
                  />

                  <PaymentGroup
                    groupName="Card"
                    submit={(name) => setSelectedPrePayment(name)}
                    selected={selectedPrePayment}
                    visa
                    mastercard
                  />

                  <PaymentGroup
                    groupName="Payment Service"
                    submit={(name) => setSelectedPrePayment(name)}
                    selected={selectedPrePayment}
                    mobilepay
                    pivo
                    paypal
                  />
                </>
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={INSTALLMENT}>
              <FormikRadioAccordion
                title="Installment"
                text="Get your package now, pay later"
              >
                <>
                  <PaymentGroup
                    submit={(name) => setSelectedInstallment(name)}
                    selected={selectedInstallment}
                    paypal
                    klarna
                  />
                </>
              </FormikRadioAccordion>
            </FormikRadioField>

            {delivery.delivery === "store-pickup" && (
              <FormikRadioField value={LOCAL_PAYMENT}>
                <FormikRadioAccordion
                  title="Local Payment"
                  text="Pay at the store"
                  price="100"
                ></FormikRadioAccordion>
              </FormikRadioField>
            )}
          </FormikRadioGroup>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Box>
      )}
    </>
  )
}

export default Payment
