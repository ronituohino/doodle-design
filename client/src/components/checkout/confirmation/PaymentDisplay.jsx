import LabelPaper from "../../general/LabelPaper";
import { Typography } from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

const PaymentDisplay = ({ checkout, constants }) => {
  const { language } = useLanguage();
  let paymentMethodText = "";
  let paymentProviderText = "";

  switch (checkout.paymentDetails.paymentMethod) {
    case constants.PREPAYMENT:
      paymentMethodText = getText(language, "prePayment");
      paymentProviderText = checkout.paymentDetails.prePayment;
      break;
    case constants.INSTALLMENT:
      paymentMethodText = getText(language, "installment");
      paymentProviderText = checkout.paymentDetails.installment;
      break;
    case constants.LOCAL_PAYMENT:
      paymentMethodText = getText(language, "localPayment");
      break;
    default:
      break;
  }
  return (
    <LabelPaper
      label={getText(language, "paymentDetails")}
      elevation={4}
      sx={{ width: "100%" }}
    >
      <Typography>{`${getText(
        language,
        "method"
      )}: ${paymentMethodText}`}</Typography>
      {paymentProviderText !== "" && (
        <Typography>
          {`${getText(language, "provider")}: ${paymentProviderText}`}
        </Typography>
      )}
    </LabelPaper>
  );
};

export default PaymentDisplay;
