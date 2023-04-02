import { Box, Typography, Paper } from "@mui/material";

import FormikField from "../../general/formik/FormikField";
import FormikCheckbox from "../../general/formik/FormikCheckbox";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

const HomeDeliveryAddress = ({ formik }) => {
  const { language } = useLanguage();
  // Fixes tiny offset
  const paperPaddingBottom = formik.values.useExplicitDeliveryAddress
    ? { paddingBottom: 2 }
    : { paddingBottom: 1 };

  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2, marginRight: 6, ...paperPaddingBottom }}
    >
      <FormikCheckbox formik={formik} field="useExplicitDeliveryAddress">
        <Typography sx={{ alignSelf: "center" }}>
          {getText(language, "recipientIsNotMe")}
        </Typography>
      </FormikCheckbox>

      {formik.values.useExplicitDeliveryAddress && (
        <>
          <Box sx={{ display: "flex", gap: "15px", marginBottom: 2 }}>
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.firstName"
              label={getText(language, "firstName")}
              sx={{ width: "50%" }}
            />

            <FormikField
              formik={formik}
              field="homeDeliveryAddress.lastName"
              label={getText(language, "lastName")}
              sx={{ width: "50%" }}
            />
          </Box>

          <FormikField
            formik={formik}
            field="homeDeliveryAddress.address"
            label={getText(language, "address")}
            sx={{ marginBottom: 2 }}
          />

          <Box sx={{ display: "flex", gap: "15px" }}>
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.zipCode"
              label={getText(language, "zipCode")}
              sx={{ width: "40%" }}
            />
            <FormikField
              formik={formik}
              field="homeDeliveryAddress.city"
              label={getText(language, "city")}
              sx={{ width: "60%" }}
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default HomeDeliveryAddress;
