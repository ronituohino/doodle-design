import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Button } from "@mui/material"

const PREPAYMENT = "prepayment"
const INSTALLMENT = "installment"
const LOCAL_PAYMENT = "local-payment"

import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import PaymentWrapper from "./PaymentWrapper"

const PaymentDetails = ({ submit, hidden, sx }) => {
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
      let valid = false
      if (values.paymentMethod === PREPAYMENT) {
        //values = { ...values, ...explicitBillingAddress }
        valid = true
      } else if (values.paymentMethod === INSTALLMENT) {
        //values = { ...values, ...postiParcelAddress }
        valid = true
      } else if (values.paymentMethod === LOCAL_PAYMENT) {
        valid = true
      } else {
        formik.setFieldError(
          "paymentMethod",
          "Payment info not complete"
        )
      }

      if (valid) {
        submit(values)
      }
    },
  })

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
                <PaymentWrapper />
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={INSTALLMENT}>
              <FormikRadioAccordion
                title="Installment"
                text="Get your package now, pay later"
              ></FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={LOCAL_PAYMENT}>
              <FormikRadioAccordion
                title="Local Payment"
                text="Pay at one of our stores"
                price="100"
              ></FormikRadioAccordion>
            </FormikRadioField>
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

export default PaymentDetails
