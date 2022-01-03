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

import { useState } from "react"

const AccountRegister = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string("Enter your first name")
        .max(30, "Must be 30 characters or less")
        .required("First name is required"),
      lastName: yup
        .string()
        .max(30, "Must be 30 characters or less")
        .required("Last name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be atleast 6 characters long")
        .required("Password is required"),
    }),
    onSubmit: (event, values) => {
      console.log(event)
      console.log(values)
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
      <FormikField
        field="firstName"
        label="First Name"
        formik={formik}
      />

      <FormikField
        field="lastName"
        label="Last Name"
        formik={formik}
      />

      <FormikField field="email" label="Email" formik={formik} />

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
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
      >
        Register
      </Button>
    </Container>
  )
}

export default AccountRegister
