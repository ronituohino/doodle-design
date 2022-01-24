import { useState } from "react"
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Icon,
  IconButton,
} from "@mui/material"

import ConfirmDialog from "../../../general/ConfirmDialog"

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../../../general/formik/FormikField"
import FormikAutoSave from "../../../general/formik/FormikAutoSave"

import { useApolloClient, useMutation } from "@apollo/client"
import {
  CRETE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from "../../../../graphql/mutations"
import { GET_CATEGORIES } from "../../../../graphql/queries"

const EditableCategory = ({ category, add }) => {
  const client = useApolloClient()
  const categoryFormik = useFormik({
    initialValues: {
      icon: "",
      label: "",
      name: "",
    },
    validationSchema: yup.object({
      icon: yup.string().required(""),
      label: yup.string().required(""),
      name: yup.string().required(""),
    }),
    onSubmit: () => {},
  })
  const [editing, setEditing] = useState(add ? true : false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEditing = () => {
    if (!editing) {
      categoryFormik.setValues({
        icon: category.icon,
        label: category.label,
        name: category.name,
      })
    }

    setEditing(!editing)
  }

  const sameValues =
    category &&
    categoryFormik.values.icon === category.icon &&
    categoryFormik.values.label === category.label &&
    categoryFormik.values.name === category.name

  const [editCategoryMutation] = useMutation(EDIT_CATEGORY, {
    onCompleted: (response) => {
      const cacheCategories = [
        ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
      ]
      const index = cacheCategories.findIndex(
        (c) => c._id === category._id
      )
      cacheCategories[index] = response.editCategory

      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: cacheCategories,
        },
      })

      setEditing(false)
    },
  })

  const editCategory = () => {
    editCategoryMutation({
      variables: { id: category._id, ...categoryFormik.values },
    })
  }

  const [createCategoryMutation] = useMutation(CRETE_CATEGORY, {
    onCompleted: (response) => {
      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: [
            ...client.readQuery({ query: GET_CATEGORIES })
              .getCategories,
            response.createCategory,
          ],
        },
      })

      // Empty fields
      categoryFormik.resetForm()
    },
  })

  const createCategory = () => {
    createCategoryMutation({
      variables: categoryFormik.values,
    })
  }

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      const cacheCategories = [
        ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
      ]
      const index = cacheCategories.findIndex(
        (c) => c._id === category._id
      )
      cacheCategories.splice(index, 1)

      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: cacheCategories,
        },
      })
    },
  })

  const deleteCategory = () => {
    deleteCategoryMutation({
      variables: {
        id: category._id,
      },
    })
  }

  return (
    <ListItem>
      <ListItemIcon>
        <Icon>
          {editing ? categoryFormik.values.icon : category.icon}
        </Icon>
      </ListItemIcon>
      <ListItemText
        primary={
          editing ? categoryFormik.values.label : category.label
        }
      />

      {editing && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              mr: 1,
              ml: 4,
            }}
          >
            <FormikField
              formik={categoryFormik}
              field="icon"
              label="Google Fonts Icon"
            />
            <FormikField
              formik={categoryFormik}
              field="label"
              label="Label"
            />
            <FormikField
              formik={categoryFormik}
              field="name"
              label="URL Path"
            />

            <FormikAutoSave formik={categoryFormik} />
          </Box>

          {!add && (
            <>
              <Button
                onClick={editCategory}
                disabled={!categoryFormik.isValid || sameValues}
                variant="contained"
                sx={{ mr: 1 }}
              >
                Update
              </Button>
              <ListItemIcon>
                <IconButton onClick={handleEditing}>
                  <Icon>clear</Icon>
                </IconButton>
              </ListItemIcon>
            </>
          )}
          {add && (
            <Button
              disabled={!categoryFormik.isValid}
              variant="contained"
              onClick={createCategory}
            >
              Create
            </Button>
          )}
        </>
      )}
      {!editing && (
        <>
          <ListItemIcon>
            <IconButton onClick={handleEditing}>
              <Icon>edit</Icon>
            </IconButton>
          </ListItemIcon>

          <ConfirmDialog
            open={deleteDialogOpen}
            closeCallback={() => setDeleteDialogOpen(false)}
            title={`Delete category ${category.label}?`}
            text="This will delete the category, but the items that are associated with this category will remain in the database."
            cancelText="Cancel"
            acceptText="Delete"
            acceptCallback={deleteCategory}
          />
          <ListItemIcon>
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <Icon>delete</Icon>
            </IconButton>
          </ListItemIcon>
        </>
      )}
    </ListItem>
  )
}

export default EditableCategory
