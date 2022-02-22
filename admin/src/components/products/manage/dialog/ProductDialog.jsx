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

import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client"
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
} from "../../../../graphql/queries"
import { FILE_UPLOAD } from "../../../../graphql/mutations"
import { CREATE_PRODUCT } from "../../../../graphql/mutations"

import FormikBox from "../../../general/formik/FormikBox"
import FormikFieldArray from "../../../general/formik/FormikFieldArray"
import FormikCustomization from "./FormikCustomization"

import DropzonePictures from "../../../general/DropzonePictures"
import FormikSelect from "../../../general/formik/FormikSelect"

import { useSnackbar } from "notistack"
import { useEffect } from "react"

import { getFileAsJSFile } from "../../../../utils/getFile"

const ProductDialog = ({
  open,
  handleClose,
  overrideValues,
  overrideSubmit,
}) => {
  const client = useApolloClient()
  const formik = useFormik({
    initialValues: {
      pictures: [],
      category: "",
      name: { en: "", fi: "" },
      description: { en: "", fi: "" },
      price: { EUR: 0 },
      customization: [],
    },
    validationSchema: yup.object({
      pictures: yup.array().min(1, "At least 1 picture is required"),

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
      // First upload pictures in the dropzone, then call other mutations
      uploadFileMutation({
        variables: { files: formik.values.pictures },
      })
    },
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  })

  useEffect(() => {
    if (open && overrideValues) {
      const pics = []

      overrideValues.pictures.forEach((i) => {
        getFileAsJSFile(i._id, i.filename).then((f) => {
          const dropzonifiedFile = Object.assign(f, {
            preview: URL.createObjectURL(f),
          })
          pics.push(dropzonifiedFile)
        })
      })

      formik.setValues({
        ...overrideValues,
        pictures: pics,
      })
    }
    // eslint-disable-next-line
  }, [open, overrideValues])

  const { data } = useQuery(GET_CATEGORIES)

  const [uploadFileMutation] = useMutation(FILE_UPLOAD, {
    onCompleted: (response) => {
      let pictureIdList = []
      response.fileUpload.forEach((f) => pictureIdList.push(f._id))

      // Check if submit is overridden (modify),
      //otherwise create new product
      if (overrideSubmit) {
        overrideSubmit({ ...formik.values, pictureIdList })
        handleClose()
      } else {
        createProductMutation({
          variables: {
            name: formik.values.name,
            price: formik.values.price,
            description: formik.values.description,
            customization: formik.values.customization,
            images: pictureIdList,
            category: formik.values.category,
          },
        })
      }
    },
  })

  const { enqueueSnackbar } = useSnackbar()

  const [createProductMutation] = useMutation(CREATE_PRODUCT, {
    onCompleted: (response) => {
      enqueueSnackbar("Product created!", {
        variant: "success",
      })
      handleClose()

      // Refetch GET_PRODUCTS query
      client.refetchQueries({
        include: [GET_PRODUCTS],
      })
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
            {overrideValues ? "Modify item" : "Add item"}
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
              setFilesCallback={(files) => {
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
          {overrideValues ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDialog
