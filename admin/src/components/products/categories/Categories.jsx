import { useState } from "react"

import { List } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../../graphql/queries"
import {
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../../../graphql/mutations"
import Category from "./Category"
import CategorySubtitle from "../../general/CategorySubtitle"

import { useApolloClient, useMutation } from "@apollo/client"

import ConfirmDialog from "../../general/ConfirmDialog"

const ProductCategories = () => {
  const client = useApolloClient()
  const { data } = useQuery(GET_CATEGORIES)

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const openCreateDialog = () => {
    setCreateDialogOpen(true)
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editDialogCategory, setEditDialogCategory] = useState(false)
  const openEditDialog = (category) => {
    setEditDialogOpen(true)
    setEditDialogCategory(category)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteDialogCategory, setDeleteDialogCategory] =
    useState(false)
  const openDeleteDialog = (category) => {
    setDeleteDialogOpen(true)
    setDeleteDialogCategory(category)
  }

  const [createCategoryMutation] = useMutation(CREATE_CATEGORY, {
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
    },
  })

  const [editCategoryMutation] = useMutation(EDIT_CATEGORY, {
    onCompleted: (response) => {
      const cacheCategories = [
        ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
      ]
      const index = cacheCategories.findIndex(
        (c) => c._id === response.editCategory._id
      )
      cacheCategories[index] = response.editCategory

      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: cacheCategories,
        },
      })
    },
  })

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    onCompleted: (response) => {
      const cacheCategories = [
        ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
      ]
      const index = cacheCategories.findIndex(
        (c) => c._id === response.editCategory._id
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

  return (
    <>
      <CategorySubtitle text="Categories" />

      <List>
        {data &&
          data.getCategories &&
          data.getCategories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
      </List>

      <ConfirmDialog
        open={deleteDialogOpen}
        closeCallback={() => setDeleteDialogOpen(false)}
        title={`Delete category?`}
        text="This will delete the category, but the items that are associated with this category will remain in the database."
        cancelText="Cancel"
        acceptText="Delete"
        acceptCallback={() => {}}
      />
    </>
  )
}

export default ProductCategories
