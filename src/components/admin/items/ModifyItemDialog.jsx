import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material/"

import { useFormik } from "formik"
import * as yup from "yup"

import { useMutation } from "@apollo/client"
import { FILE_UPLOAD } from "../../../graphql/mutations"
import { CREATE_ITEM } from "../../../graphql/mutations"

import FormikBox from "../../general/formik/FormikBox"
import FormikField from "../../general/formik/FormikField"
import FormikFieldArray from "../../general/formik/FormikFieldArray"
import FormikCustomization from "./FormikCustomization"

import DropzonePictures from "../../general/DropzonePictures"

const ModifyItemDialog = ({ open, handleClose }) => {
  const itemFormik = useFormik({
    initialValues: {
      pictures: [],
      name: { EN: "", FI: "" },
      description: { EN: "", FI: "" },
      price: { EUR: "" },
      discount: "",
      customization: [],
    },
    validationSchema: yup.object({
      pictures: yup.array().min(1, "Atleast 1 picture is required"),

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
      submit(values)
    },
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  })

  const submit = async (values) => {
    const res = await handleUpload()
    console.log(res)
    const pictureIdList = res.map((r) => console.log(r))

    console.log(pictureIdList)
    const response = await createItemMutation({
      variables: {
        name: values.name,
        price: values.price,
        description: values.description,
        customization: values.customization,
        images: pictureIdList,
        category: "61debc25cb80730456ee8074",
      },
    })

    console.log(response)
  }

  const [uploadFileMutation] = useMutation(FILE_UPLOAD)

  const handleUpload = async () => {
    const results = []

    await itemFormik.values.pictures.forEach(async (f) => {
      const result = await uploadFileMutation({
        variables: { file: f },
      })
      results.push(result)
    })

    return results
  }

  const [createItemMutation] = useMutation(CREATE_ITEM, {
    onError: (error) => {
      console.log(error)
      return undefined
    },
    onCompleted: (res) => {
      return res
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
            Add Item
          </Typography>
          <Box sx={{ flexBasis: "100%" }} />
          <Button variant="contained" onClick={itemFormik.resetForm}>
            Clear
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <FormikBox
            formik={itemFormik}
            field="pictures"
            label="Pictures"
            sx={{ mb: 2 }}
          >
            <DropzonePictures
              files={itemFormik.values.pictures}
              setFiles={(files) => {
                itemFormik.setFieldValue("pictures", files)
              }}
              text="Drag and drop, or click here to add pictures"
              subtext="(select multiple pictures to upload them all)"
            />

            <Button
              onClick={() => {
                itemFormik.setFieldValue("pictures", [])
              }}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
            >
              Clear pictures
            </Button>
          </FormikBox>

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
