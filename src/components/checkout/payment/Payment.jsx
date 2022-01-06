import { Container, Button } from "@mui/material"

import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup"
import FormikRadioField from "../../general/formik/radio/FormikRadioField"
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion"
import PaymentGroup from "./PaymentGroup"
import FormikAutoSave from "../../general/formik/FormikAutoSave"
import FormikBox from "../../general/formik/FormikBox"

const Payment = ({ formik, constants, next, checkout, hidden }) => {
  const nextButtonDisabled =
    !checkout || !checkout.paymentDetails || !formik.isValid

  return (
    <>
      {!hidden && (
        <Container
          maxWidth="md"
          sx={{
            marginTop: 2,
          }}
        >
          <FormikRadioGroup
            formik={formik}
            label="Payment Details"
            field="paymentMethod"
            sx={{ marginBottom: 2 }}
            innerSx={{ padding: 2 }}
          >
            <FormikRadioField value={constants.PREPAYMENT}>
              <FormikRadioAccordion
                title="Prepayment"
                text="Payment using a card, banking applications, or payment services"
              >
                <FormikBox
                  formik={formik}
                  field="prePayment"
                  sx={{ marginTop: -2 }}
                  innerSx={{
                    padding: 4,
                    paddingTop: 2,
                    paddingBottom: 0,
                  }}
                >
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
                </FormikBox>
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.INSTALLMENT}>
              <FormikRadioAccordion
                title="Installment"
                text="Get your package now, pay later"
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                <FormikBox
                  formik={formik}
                  field="installment"
                  sx={{ marginTop: -2 }}
                  innerSx={{
                    padding: 4,
                    paddingTop: 2,
                    paddingBottom: 0,
                  }}
                >
                  <PaymentGroup
                    submit={(name) =>
                      formik.setFieldValue("installment", name)
                    }
                    selected={formik.values.installment}
                    paypal
                    klarna
                  />
                </FormikBox>
              </FormikRadioAccordion>
            </FormikRadioField>

            {checkout.deliveryDetails.deliveryMethod ===
              constants.STORE_PICKUP && (
              <FormikRadioField value={constants.LOCAL_PAYMENT}>
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
        </Container>
      )}
    </>
  )
}

export default Payment
