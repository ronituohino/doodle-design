import { useEffect } from "react"

import { useFormik } from "formik"
import * as yup from "yup"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material/"

import {
  useMutation,
  useApolloClient,
  useQuery,
} from "@apollo/client"

import { useSnackbar } from "notistack"
import { EDIT_ACCOUNT } from "../../../graphql/mutations"
import {
  ACCOUNT,
  GET_ACCOUNTS,
  GET_ACCOUNT_TYPES,
} from "../../../graphql/queries"

import FormikSelect from "../../general/formik/FormikSelect"
import FormikField from "../../general/formik/FormikField"

import FormikAutoSave from "../../general/formik/FormikAutoSave"

const EditAccountDialog = ({ open, handleClose, values, userId }) => {
  const client = useApolloClient()
  const { enqueueSnackbar } = useSnackbar()
  const { data } = useQuery(GET_ACCOUNT_TYPES)

  let accountTypes = null
  if (data && data.getAccountTypes) {
    accountTypes = Object.entries(data.getAccountTypes)
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      isPassword: false,
      password: "",
      accountType: "",
    },
    validationSchema: yup.object({
      username: yup.string(),
      isPassword: yup.boolean(),
      email: yup.string().when("isPassword", {
        is: true,
        then: yup
          .string()
          .min(6, "Password must be atleast 6 characters long"),
      }),
      password: yup.string(),
      accountType: yup.string(),
    }),
    onSubmit: () => {},
  })

  useEffect(() => {
    if (open && values) {
      formik.setValues({
        username: values.username,
        email: values.email,
        isPassword: false,
        password: "",
        accountType: values.accountType,
      })
    }
    // eslint-disable-next-line
  }, [open, values])

  const [editAccountMutation] = useMutation(EDIT_ACCOUNT, {
    onCompleted: () => {
      enqueueSnackbar("Account updated!", {
        variant: "success",
      })

      // Refetch GET_ACCOUNTS query
      // Also refetch ACCOUNT query in case this was the
      // current account we were logged in with
      client.refetchQueries({
        include: [GET_ACCOUNTS, ACCOUNT],
      })

      handleClose()
    },
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h5"
            sx={{ width: "50%", alignSelf: "center" }}
          >
            Modify account
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <FormikAutoSave formik={formik} />
          <FormikField
            formik={formik}
            field="username"
            label="Username"
          />
          <FormikField formik={formik} field="email" label="Email" />
          <FormikField
            formik={formik}
            field="password"
            label="Password"
            onChange={(event) => {
              if (event.target.value.length > 0) {
                formik.setFieldValue("isPassword", true)
              } else {
                formik.setFieldValue("isPassword", false)
              }
            }}
          />
          <FormikSelect
            formik={formik}
            field="accountType"
            label="Account Type"
            sx={{ width: "100%", mb: 2 }}
          >
            {data &&
              data.getAccountTypes &&
              accountTypes.map((type) => (
                <MenuItem key={type[1]} value={type[1]}>
                  {type[1]}
                </MenuItem>
              ))}
          </FormikSelect>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            editAccountMutation({
              variables: {
                id: userId,
                username: formik.values.username,
                email: formik.values.email,
                password: formik.values.isPassword
                  ? formik.values.password
                  : null,
                accountType: formik.values.accountType,
              },
            })
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditAccountDialog
