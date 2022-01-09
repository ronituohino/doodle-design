import { useFormik } from "formik"
import * as yup from "yup"

import {
  Container,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material"

import FormikField from "../general/formik/FormikField"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

import { useAccount } from "../../hooks/useAccount"
import { useRouting } from "../../hooks/useRouting"

import { useState } from "react"
import BetterPaper from "../general/BetterPaper"

const AccountRegister = () => {
  const { back } = useRouting()
  const { register } = useAccount()

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
      register(values.username, values.email, values.password, back)
    },
  })

  const [values, setValues] = useState({
    showPassword: false,
  })

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Container
      maxWidth={"xs"}
      sx={{
        marginTop: 4,
      }}
    >
      <BetterPaper innerSx={{ padding: 2 }}>
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
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
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
          Register
        </Button>
      </BetterPaper>
    </Container>
  )
}

export default AccountRegister
