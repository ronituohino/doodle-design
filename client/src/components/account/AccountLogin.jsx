import { useFormik } from "formik";
import * as yup from "yup";

import {
  Container,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Icon,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useRouting } from "../../hooks/useRouting";
import { useAccount } from "../../hooks/useAccount";

import FormikField from "../general/formik/FormikField";
import { Link } from "react-router-dom";

import LoadingButton from "../general/LoadingButton";
import { useSnackbar } from "notistack";
import { useLanguage } from "../../hooks/useLanguage";
import { getText } from "../../utils/dictionary";

const AccountLogin = () => {
  const { language } = useLanguage();
  const { openLink, homeLink, registerLink } = useRouting();
  const { enqueueSnackbar } = useSnackbar();
  const [waiting, setWaiting] = useState(false);

  const { logIn, loginData } = useAccount(() => {
    enqueueSnackbar(getText(language, "loggedInNotification"), {
      variant: "success",
    });
    openLink(homeLink());
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required(getText(language, "emailRequired")),
      password: yup.string().required(getText(language, "passwordRequired")),
    }),
    onSubmit: values => {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
        logIn(values.email, values.password);
      }, 2000);
    },
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
          loading={waiting || (loginData ? loginData.loading : false)}
          disabled={!formik.isValid || formik.values === formik.initialValues}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={formik.handleSubmit}
          text={getText(language, "login")}
        />

        <Link to={registerLink()} style={{ textDecoration: "none" }}>
          <Typography color="secondary" sx={{ textAlign: "center", mt: 1 }}>
            {getText(language, "newHere")}
          </Typography>
        </Link>
      </Paper>
    </Container>
  );
};

export default AccountLogin;
