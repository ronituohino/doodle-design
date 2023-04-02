import { useFormik } from "formik";
import * as yup from "yup";

import {
  InputAdornment,
  IconButton,
  Paper,
  Icon,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useAccount } from "../../hooks/useAccount";

import FormikField from "../general/formik/FormikField";

import LoadingButton from "../general/LoadingButton";

const Login = () => {
  const { logIn, loginData } = useAccount();
  const [waiting, setWaiting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: values => {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
        logIn(values.email, values.password);
      }, 3000);
    },
  });

  const [values, setValues] = useState({
    showPassword: false,
  });

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography color="grey.600" sx={{ pb: 2, textAlign: "center" }}>
        Log in as administrator
      </Typography>
      <FormikField
        field="email"
        label="Email"
        formik={formik}
        sx={{ marginBottom: 2 }}
      />

      <FormikField
        field="password"
        label="Password"
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
        color="primary"
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
        text="Log in"
      />
    </Paper>
  );
};

export default Login;
