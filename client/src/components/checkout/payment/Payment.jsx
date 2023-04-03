import { Container, Button } from "@mui/material";

import FormikRadioGroup from "../../general/formik/radio/FormikRadioGroup";
import FormikRadioField from "../../general/formik/radio/FormikRadioField";
import FormikRadioAccordion from "../../general/formik/radio/FormikRadioAccordion";
import PaymentGroup from "./PaymentGroup";
import FormikAutoSave from "../../general/formik/FormikAutoSave";
import { getText } from "../../../utils/dictionary";
import { useLanguage } from "../../../hooks/useLanguage";

const Payment = ({ formik, constants, next, checkout, hidden }) => {
  const { language } = useLanguage();
  const nextButtonDisabled =
    !checkout || !checkout.paymentDetails || !formik.isValid;

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
            field="paymentMethod"
            sx={{ marginBottom: 2 }}
            innerSx={{ padding: 2 }}
          >
            <FormikRadioField value={constants.PREPAYMENT}>
              <FormikRadioAccordion
                title={getText(language, "prePayment")}
                text={getText(language, "prePaymentDetails")}
              >
                <PaymentGroup
                  groupName={getText(language, "bankPayment")}
                  submit={name => formik.setFieldValue("prePayment", name)}
                  selected={formik.values.prePayment}
                  op
                  danskebank
                  spankki
                  nordea
                />

                <PaymentGroup
                  groupName={getText(language, "card")}
                  submit={name => formik.setFieldValue("prePayment", name)}
                  selected={formik.values.prePayment}
                  visa
                  mastercard
                />

                <PaymentGroup
                  groupName={getText(language, "paymentService")}
                  submit={name => formik.setFieldValue("prePayment", name)}
                  selected={formik.values.prePayment}
                  mobilepay
                  pivo
                  paypal
                />
              </FormikRadioAccordion>
            </FormikRadioField>

            <FormikRadioField value={constants.INSTALLMENT}>
              <FormikRadioAccordion
                title={getText(language, "installment")}
                text={getText(language, "installmentDetails")}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                <PaymentGroup
                  submit={name => formik.setFieldValue("installment", name)}
                  selected={formik.values.installment}
                  paypal
                  klarna
                />
              </FormikRadioAccordion>
            </FormikRadioField>

            {checkout.deliveryDetails.deliveryMethod ===
              constants.STORE_PICKUP && (
              <FormikRadioField value={constants.LOCAL_PAYMENT}>
                <FormikRadioAccordion
                  title={getText(language, "localPayment")}
                  text={getText(language, "localPaymentDetails")}
                  price="100"
                ></FormikRadioAccordion>
              </FormikRadioField>
            )}
          </FormikRadioGroup>

          <FormikAutoSave formik={formik} />

          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={next}
            disabled={nextButtonDisabled}
          >
            {getText(language, "next")}
          </Button>
        </Container>
      )}
    </>
  );
};

export default Payment;
