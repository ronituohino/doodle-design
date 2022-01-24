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

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../../../general/formik/FormikField"
import FormikAutoSave from "../../../general/formik/FormikAutoSave"

const EditableCategory = ({ category, add }) => {
  const categoryFormik = useFormik({
    initialValues: {
      icon: "",
      label: "",
      urlPath: "",
    },
    validationSchema: yup.object({
      icon: yup.string().required(""),
      label: yup.string().required(""),
      urlPath: yup.string().required(""),
    }),
    onSubmit: () => {},
  })
  const [editing, setEditing] = useState(add ? true : false)

  const handleEditing = () => {
    if (!editing) {
      categoryFormik.setValues({
        icon: category.icon,
        label: category.label,
        urlPath: category.name,
      })
    }

    setEditing(!editing)
  }

  const addNew = () => {
    console.log("add")
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
              field="urlPath"
              label="URL Path"
            />

            <FormikAutoSave formik={categoryFormik} />
          </Box>

          {!add && (
            <>
              <ListItemIcon>
                <IconButton onClick={handleEditing}>
                  <Icon>upgrade</Icon>
                </IconButton>
              </ListItemIcon>

              <ListItemIcon>
                <IconButton onClick={handleEditing}>
                  <Icon>clear</Icon>
                </IconButton>
              </ListItemIcon>
            </>
          )}
          {add && (
            <ListItemIcon>
              <IconButton onClick={addNew}>
                <Icon>add</Icon>
              </IconButton>
            </ListItemIcon>
          )}
        </>
      )}
      {!editing && (
        <ListItemIcon>
          <IconButton onClick={handleEditing}>
            <Icon>edit</Icon>
          </IconButton>
        </ListItemIcon>
      )}
    </ListItem>
  )
}

export default EditableCategory
