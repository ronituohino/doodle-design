import { useApolloClient, useMutation } from "@apollo/client"
import { Box, Typography, Button } from "@mui/material"

import { useFormik } from "formik"
import { useEffect } from "react"
import * as yup from "yup"

import { EDIT_USER } from "../../graphql/mutations"
import { ACCOUNT } from "../../graphql/queries"
import { useAccount } from "../../hooks/useAccount"

import FormikField from "../general/formik/FormikField"
import CategorySubtitle from "../general/CategorySubtitle"

const AccountSettings = () => {
  const { data } = useAccount()
  const client = useApolloClient()

  const [editUserMutation] = useMutation(EDIT_USER, {
    onCompleted: (response) => {
      client.writeQuery({
        query: ACCOUNT,
        data: { me: response.editUser },
      })
    },
  })

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Not a valid email"),
    }),
  })

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },

    validationSchema: yup.object({
      password: yup
        .string()
        .min(6, "Password must be atleast 6 characters long"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match"),
    }),
  })

  useEffect(() => {
    if (data && data.me) {
      emailFormik.setFieldValue("email", data.me.email)
    }
  }, [data])

  return (
    <>
      {data && data.me && (
        <Box sx={{ padding: 2, width: "60%" }}>
          <CategorySubtitle text="Account Settings" />

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <FormikField
                formik={emailFormik}
                field="email"
                label="Email"
              />
              <Button
                onClick={() =>
                  editUserMutation({
                    variables: {
                      email: emailFormik.values.email,
                    },
                  })
                }
                disabled={
                  !emailFormik.isValid ||
                  data.me.email === emailFormik.values.email ||
                  emailFormik.values.email.length === 0
                }
                variant="contained"
                sx={{ maxWidth: "50px", maxHeight: "56px" }}
              >
                Update
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
              <FormikField
                formik={passwordFormik}
                field="password"
                label="Password"
                type="password"
              />

              <FormikField
                formik={passwordFormik}
                field="passwordConfirm"
                label="Password again"
                type="password"
              />

              <Button
                onClick={() =>
                  editUserMutation({
                    variables: {
                      password: passwordFormik.values.password,
                    },
                  })
                }
                disabled={
                  !passwordFormik.isValid ||
                  passwordFormik.values.password.length === 0
                }
                variant="contained"
                sx={{ maxWidth: "50px", maxHeight: "56px" }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default AccountSettings
