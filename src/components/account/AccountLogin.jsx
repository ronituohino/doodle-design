import { useFormik } from "formik"
import * as yup from "yup"

import {
  Container,
  Button,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material"

import Icon from "../general/Icon"

import { useState } from "react"
import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

import FormikField from "../general/formik/FormikField"

const AccountLogin = () => {
  const { back } = useRouting()
  const { logIn } = useAccount()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      logIn(values.email, values.password, back)
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
                    <Icon name="visOff" />
                  ) : (
                    <Icon name="visOn" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          formik={formik}
          sx={{ marginBottom: 2 }}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={formik.handleSubmit}
        >
          Log in
        </Button>
      </Paper>
    </Container>
  )
}

export default AccountLogin
