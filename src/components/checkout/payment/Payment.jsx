import { useFormik } from "formik"
import * as yup from "yup"

import { useEffect } from "react"

import { Box, Button } from "@mui/material"

const PREPAYMENT = "prepayment"
const INSTALLMENT = "installment"
const LOCAL_PAYMENT = "local-payment"

import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import PaymentGroup from "./PaymentGroup"
import FormikAutoSave from "../../general/formik/FormikAutoSave"
import { useCheckout } from "../../../hooks/useCheckout"

const Payment = ({ next, sx }) => {
  const { data, setPaymentDetails } = useCheckout()

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",

      prePayment: undefined,
      installment: undefined,
    },
    validationSchema: yup.object({
      paymentMethod: yup
        .string()
        .required("Payment method is required"),

      prePayment: yup.string().when("paymentMethod", {
        is: (paymentMethod) => paymentMethod === PREPAYMENT,
        then: yup
          .string()
          .required("Prepayment provider is required"),
      }),

      installment: yup.string().when("paymentMethod", {
        is: (paymentMethod) => paymentMethod === INSTALLMENT,
        then: yup
          .string()
          .required("Installment provider is required"),
      }),
    }),
    onSubmit: (values) => {
      setPaymentDetails(values)
    },
  })

  useEffect(() => {
    if (data && data.checkout && data.checkout.paymentDetails) {
      formik.setValues(data.checkout.paymentDetails)
    }
  }, [])

  const nextButtonDisabled =
    !data ||
    !data.checkout ||
    !data.checkout.paymentDetails ||
    !formik.isValid

  return (
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
                submit={(name) =>
                  formik.setFieldValue("prePayment", name)
                }
                selected={formik.values.prePayment}
                op
                danskebank
                spankki
                nordea
              />

              <PaymentGroup
                groupName="Card"
                submit={(name) =>
                  formik.setFieldValue("prePayment", name)
                }
                selected={formik.values.prePayment}
                visa
                mastercard
              />

              <PaymentGroup
                groupName="Payment Service"
                submit={(name) =>
                  formik.setFieldValue("prePayment", name)
                }
                selected={formik.values.prePayment}
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
                submit={(name) =>
                  formik.setFieldValue("installment", name)
                }
                selected={formik.values.installment}
                paypal
                klarna
              />
            </>
          </FormikRadioAccordion>
        </FormikRadioField>

        {formik.values.paymentMethod === "store-pickup" && (
          <FormikRadioField value={LOCAL_PAYMENT}>
            <FormikRadioAccordion
              title="Local Payment"
              text="Pay at the store"
              price="100"
            ></FormikRadioAccordion>
          </FormikRadioField>
        )}
      </FormikRadioGroup>

      <FormikAutoSave formik={formik} />

      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={next}
        disabled={nextButtonDisabled}
      >
        Next
      </Button>
    </Box>
  )
}

export default Payment
