import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Icon,
} from "@mui/material";

import { useFormik } from "formik";
import * as yup from "yup";

import FormikField from "../general/formik/FormikField";

import { useAccount } from "../../hooks/useAccount";
import { useRouting } from "../../hooks/useRouting";

import { Link } from "react-router-dom";

import LoadingButton from "../general/LoadingButton";
import { useSnackbar } from "notistack";
import { useLanguage } from "../../hooks/useLanguage";
import { getText } from "../../utils/dictionary";

const AccountRegister = () => {
  const { language } = useLanguage();

  const { openLink, homeLink, loginLink } = useRouting();
  const { enqueueSnackbar } = useSnackbar();
  const [waiting, setWaiting] = useState(false);

  const { register, registerData } = useAccount(() => {
    enqueueSnackbar(getText(language, "registrationNotification"), {
      variant: "success",
    });
    openLink(homeLink());
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .max(30, getText(language, "lessThanThirtyChars")) //useEffect reload validationSchema?
        .required(getText(language, "usernameRequired")),
      email: yup
        .string()
        .email(getText(language, "emailIncorrect"))
        .required(getText(language, "emailRequired")),
      password: yup
        .string()
        .min(6, getText(language, "moreThanFiveChars"))
        .required(getText(language, "passwordRequired")),
    }),
    onSubmit: values => {
      setWaiting(true);
      setTimeout(() => {
        register(values.username, values.email, values.password);
      }, 4000);
    },
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line
  }, [language]);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={4} sx={{ padding: 2 }}>
        <FormikField
          field="username"
          label={getText(language, "username")}
          formik={formik}
          sx={{ marginBottom: 2 }}
        />

        <FormikField
          field="email"
          label={getText(language, "email")}
          formik={formik}
          sx={{ marginBottom: 2 }}
        />

        <FormikField
          field="password"
          label={getText(language, "password")}
          type={values.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {values.showPassword ? (
                    <Icon>visibility_off</Icon>
                  ) : (
                    <Icon>visibility</Icon>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          formik={formik}
          sx={{ marginBottom: 2 }}
        />
        <LoadingButton
          loading={waiting || (registerData ? registerData.loading : false)}
          disabled={!formik.isValid || formik.values === formik.initialValues}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={formik.handleSubmit}
          text={getText(language, "register")}
        />

        <Link to={loginLink()} style={{ textDecoration: "none" }}>
          <Typography color="secondary" sx={{ textAlign: "center", mt: 1 }}>
            {getText(language, "registeredAlready")}
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default AccountRegister;
