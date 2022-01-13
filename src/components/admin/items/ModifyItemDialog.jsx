import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material/"

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../../general/formik/FormikField"
import FormikFieldArray from "../../general/formik/FormikFieldArray"
import FormikCustomization from "./FormikCustomization"

const ModifyItemDialog = ({ open, handleClose }) => {
  const itemFormik = useFormik({
    initialValues: {
      name: { EN: "", FI: "" },
      description: { EN: "", FI: "" },
      price: { EUR: "" },
      discount: "",
      customization: [],
      pictures: [],
    },
    validationSchema: yup.object({
      name: yup
        .array()
        .of(yup.string().required("Provide a name"))
        .length(2, "2 names required")
        .required("Provide names"),

      price: yup
        .array()
        .of(yup.number().required("Provide a price"))
        .length(1, "1 price required")
        .required("Provide price"),

      discount: yup.number(),

      customization: yup.array().of(
        yup.object({
          label: yup.string(),
          options: yup
            .array()
            .of(yup.string().required("Options required"))
            .length(2, "2 options required")
            .required("Provide options"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log(values)
    },
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Item</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <FormikFieldArray
            formik={itemFormik}
            field="name"
            label="Name"
          />

          <FormikFieldArray
            formik={itemFormik}
            field="description"
            label="Description"
            multiline
          />

          <FormikFieldArray
            formik={itemFormik}
            field="price"
            label="Price"
          />

          <FormikField
            formik={itemFormik}
            field="discount"
            label="Discount %"
          />

          <FormikCustomization
            formik={itemFormik}
            field="customization"
            label="Customization Options"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={itemFormik.handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModifyItemDialog
