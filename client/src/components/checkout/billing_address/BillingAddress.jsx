import { Container, Button } from "@mui/material";

import { Box, Paper } from "@mui/material";

import FormikField from "../../general/formik/FormikField";
import FormikAutoSave from "../../general/formik/FormikAutoSave";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

const BillingAddress = ({ formik, next, checkout, hidden }) => {
  const { language } = useLanguage();
  const nextButtonDisabled =
    !checkout || !checkout.billingDetails || !formik.isValid;

  return (
    <>
      {!hidden && (
        <Container maxWidth="sm">
          <Paper elevation={4} sx={{ marginBottom: 2, padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <FormikField
                formik={formik}
                field="firstName"
                label={getText(language, "firstName")}
                sx={{ width: "50%" }}
              />

              <FormikField
                formik={formik}
                field="lastName"
                label={getText(language, "lastName")}
                sx={{ width: "50%" }}
              />
            </Box>

            <FormikField
              formik={formik}
              field="address"
              label={getText(language, "address")}
              sx={{ marginBottom: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                marginBottom: 2,
                width: "100%",
              }}
            >
              <FormikField
                formik={formik}
                field="zipCode"
                label={getText(language, "zipCode")}
                sx={{ width: "40%" }}
              />
              <FormikField
                formik={formik}
                field="city"
                label={getText(language, "city")}
                sx={{ width: "60%" }}
              />
            </Box>

            <FormikField
              formik={formik}
              field="company"
              label={getText(language, "company")}
            />

            <FormikAutoSave formik={formik} />
          </Paper>

          <Button
            fullWidth
            color="secondary"
            variant="contained"
            disabled={nextButtonDisabled}
            onClick={next}
          >
            {getText(language, "next")}
          </Button>
        </Container>
      )}
    </>
  );
};

export default BillingAddress;
