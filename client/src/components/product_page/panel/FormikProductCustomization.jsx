import { MenuItem } from "@mui/material";
import FormikSelect from "../../general/formik/FormikSelect";

const FormikProductCustomization = ({ formik, product, language }) => {
  return (
    <>
      {[...Array(product.customization.length)].map((x, i) => {
        const c = product.customization[i];
        const labelText = c.label[language];

        const value = formik.values[i];
        const valueText = value.option !== null ? value.option[language] : "";

        return (
          <FormikSelect
            formik={formik}
            key={labelText}
            field={labelText}
            label={labelText}
            overrideValue={valueText}
            onChange={e => {
              const option = c.options.find(
                o => o[language] === e.target.value
              );

              const formikVals = formik.values;
              formikVals[i] = { label: c.label, option };

              formik.setValues(formikVals);
            }}
            sx={{
              marginBottom: 2,
              width: "100%",
            }}
          >
            {c.options.map(o => {
              const text = o[language];
              return (
                <MenuItem key={text} value={text}>
                  {text}
                </MenuItem>
              );
            })}
          </FormikSelect>
        );
      })}
    </>
  );
};

export default FormikProductCustomization;
