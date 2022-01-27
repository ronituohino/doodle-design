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

import { useFormik } from "formik"
import * as yup from "yup"

import { useQuery, useMutation } from "@apollo/client"
import { GET_CATEGORIES } from "../../../../graphql/queries"
import { FILE_UPLOAD } from "../../../../graphql/mutations"
import { CREATE_PRODUCT } from "../../../../graphql/mutations"

import FormikBox from "../../../general/formik/FormikBox"
import FormikField from "../../../general/formik/FormikField"
import FormikFieldArray from "../../../general/formik/FormikFieldArray"
import FormikCustomization from "./FormikCustomization"

import DropzonePictures from "../../../general/DropzonePictures"
import FormikSelect from "../../../general/formik/FormikSelect"

const ModifyProductDialog = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      pictures: [],
      category: "",
      name: { en: "", fi: "" },
      description: { en: "", fi: "" },
      price: { EUR: 0 },
      discount: "",
      customization: [],
    },
    validationSchema: yup.object({
      pictures: yup.array().min(1, "Atleast 1 picture is required"),

      category: yup.string().required("Category required"),

      name: yup
        .object({
          en: yup.string().required("English name required"),
          fi: yup.string().required("Finnish name required"),
        })
        .required("Name object missing, contact IT!"),

      description: yup
        .object({
          en: yup.string(),
          fi: yup.string(),
        })
        .required("Name object missing, contact IT!"),

      price: yup
        .object({
          EUR: yup
            .number()
            .required("Price in euros is required")
            .moreThan(0, "Price must be greater than 0"),
        })
        .required("Price object missing, contact IT!"),

      discount: yup.number(),

      customization: yup.array().of(
        yup.object({
          label: yup
            .object({
              en: yup.string().required("English label required"),
              fi: yup.string().required("Finnish label required"),
            })
            .required("Label object missing, contact IT!"),

          options: yup
            .array()
            .of(
              yup
                .object({
                  en: yup
                    .string()
                    .required("English option required"),
                  fi: yup
                    .string()
                    .required("Finnish option required"),
                })
                .required("Option object missing, contact IT!")
            )
            .required("Options array missing, contact IT!"),
        })
      ),
    }),
    onSubmit: () => {
      uploadFileMutation({
        variables: { files: formik.values.pictures },
      })
    },
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  })

  const [uploadFileMutation] = useMutation(FILE_UPLOAD, {
    onCompleted: (response) => {
      let pictureIdList = []
      response.fileUpload.forEach((f) => pictureIdList.push(f._id))

      createProductMutation({
        variables: {
          name: formik.values.name,
          price: formik.values.price,
          description: formik.values.description,
          customization: formik.values.customization,
          images: pictureIdList,
          category: "61debc25cb80730456ee8074",
        },
      })
    },
  })

  const [createProductMutation] = useMutation(CREATE_PRODUCT, {
    onCompleted: (response) => {
      console.log(response)
    },
  })

  const { data } = useQuery(GET_CATEGORIES)

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
          <Button variant="contained" onClick={formik.resetForm}>
            Clear
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <FormikBox
            formik={formik}
            field="pictures"
            label="Pictures"
            sx={{ mb: 2 }}
          >
            <DropzonePictures
              files={formik.values.pictures}
              setFiles={(files) => {
                formik.setFieldValue("pictures", files)
              }}
              text="Drag and drop, or click here to add pictures"
              subtext="(select multiple pictures to upload them all)"
            />

            <Button
              onClick={() => {
                formik.setFieldValue("pictures", [])
              }}
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
            >
              Clear pictures
            </Button>
          </FormikBox>

          <FormikSelect
            formik={formik}
            field="category"
            label="Category"
            sx={{ width: "100%", mb: 2 }}
          >
            {data &&
              data.getCategories &&
              data.getCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.label}
                </MenuItem>
              ))}
          </FormikSelect>

          <FormikFieldArray
            formik={formik}
            field="name"
            label="Name"
          />

          <FormikFieldArray
            formik={formik}
            field="description"
            label="Description"
            multiline
          />

          <FormikFieldArray
            formik={formik}
            field="price"
            label="Price"
            type="number"
          />

          <FormikField
            formik={formik}
            field="discount"
            label="Discount %"
          />

          <FormikCustomization
            formik={formik}
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
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModifyProductDialog
