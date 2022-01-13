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
        .object({
          EN: yup.string().required("English name required"),
          FI: yup.string().required("Finnish name required"),
        })
        .required("Name object missing, contact IT!"),

      description: yup
        .object({
          EN: yup.string(),
          FI: yup.string(),
        })
        .required("Name object missing, contact IT!"),

      price: yup
        .object({
          EUR: yup.string().required("Price in euros is required"),
        })
        .required("Price object missing, contact IT!"),

      discount: yup.number(),

      customization: yup.array().of(
        yup.object({
          label: yup
            .object({
              EN: yup.string().required("English label required"),
              FI: yup.string().required("Finnish label required"),
            })
            .required("Label object missing, contact IT!"),

          options: yup
            .array()
            .of(
              yup
                .object({
                  EN: yup
                    .string()
                    .required("English option required"),
                  FI: yup
                    .string()
                    .required("Finnish option required"),
                })
                .required("Option object missing, contact IT!")
            )
            .required("Options array missing, contact IT!"),
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
          color="error"
          fullWidth
          onClick={handleClose}
        >
          Cancel
        </Button>
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
