import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  Button,
} from "@mui/material"

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../../general/formik/FormikField"
import FormikFieldArray from "../../general/formik/FormikFieldArray"

const CategoryDialog = ({
  open,
  handleClose,
  values,
  createCategory,
  editCategory,
}) => {
  const formik = useFormik({
    initialValues: {
      icon: "",
      label: { en: "", fi: "" },
      urlPath: "",
    },
    validationSchema: yup.object({
      icon: yup.string().required(""),
      label: yup
        .object({
          en: yup.string().required(""),
          fi: yup.string().required(""),
        })
        .required(""),
      urlPath: yup.string().required(""),
    }),
    onSubmit: () => {},
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
            {values ? "Modify product" : "Add product"}
          </Typography>
          <Box sx={{ flexBasis: "100%" }} />
          <Button variant="contained" onClick={formik.resetForm}>
            Clear
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <FormikField
            formik={formik}
            field="icon"
            label="Google Fonts Icon"
          />
          <FormikFieldArray
            formik={formik}
            field="label"
            label="Label"
          />
          <FormikField
            formik={formik}
            field="urlPath"
            label="URL Path"
          />
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
          onClick={formik.handleSubmit}
        >
          {values ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryDialog
