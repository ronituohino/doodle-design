import { useState } from "react"

import {
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Icon,
} from "@mui/material"

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../general/formik/FormikField"

import { useAccount } from "../../hooks/useAccount"
import { useRouting } from "../../hooks/useRouting"

import { Link } from "react-router-dom"

import LoadingButton from "../general/LoadingButton"
import { useSnackbar } from "notistack"

const AccountRegister = () => {
  const { openLink, homeLink, loginLink } = useRouting()
  const { enqueueSnackbar } = useSnackbar()
  const [waiting, setWaiting] = useState(false)

  const { register, registerData } = useAccount(() => {
    enqueueSnackbar("Account created, welcome!", {
      variant: "success",
    })
    openLink(homeLink())
  })

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .max(30, "Must be 30 characters or less")
        .required("Username is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be atleast 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setWaiting(true)
      setTimeout(() => {
        register(values.username, values.email, values.password)
      }, 4000)
    },
  })

  const [values, setValues] = useState({
    showPassword: false,
  })

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={4} sx={{ padding: 2 }}>
        <FormikField
          field="username"
          label="Username"
          formik={formik}
          sx={{ marginBottom: 2 }}
        />

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
          loading={
            waiting || (registerData ? registerData.loading : false)
          }
          disabled={
            !formik.isValid || formik.values === formik.initialValues
          }
          color="primary"
          variant="contained"
          fullWidth
          onClick={formik.handleSubmit}
          text="Register"
        />

        <Link to={loginLink()} style={{ textDecoration: "none" }}>
          <Typography
            color="primary"
            sx={{ textAlign: "center", mt: 1 }}
          >
            Already have an account?
          </Typography>
        </Link>
      </Paper>
    </Container>
  )
}

export default AccountRegister
