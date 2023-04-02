import { useState } from "react";

import { List, Button, Box } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../../graphql/queries";
import {
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from "../../../graphql/mutations";
import Category from "./Category";
import CategorySubtitle from "../../general/CategorySubtitle";

import { useApolloClient, useMutation } from "@apollo/client";

import ConfirmDialog from "../../general/ConfirmDialog";
import CategoryDialog from "./CategoryDialog";

const ProductCategories = () => {
  const client = useApolloClient();
  const { data } = useQuery(GET_CATEGORIES);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const openCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDialogCategory, setEditDialogCategory] = useState(false);
  const openEditDialog = category => {
    setEditDialogOpen(true);
    setEditDialogCategory(category);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogCategory, setDeleteDialogCategory] = useState(false);
  const openDeleteDialog = category => {
    setDeleteDialogOpen(true);
    setDeleteDialogCategory(category);
  };

  const [createCategoryMutation] = useMutation(CREATE_CATEGORY, {
    onCompleted: response => {
      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: [
            ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
            response.createCategory,
          ],
        },
      });
    },
  });

  const [editCategoryMutation] = useMutation(EDIT_CATEGORY, {
    onCompleted: response => {
      const cacheCategories = [
        ...client.readQuery({ query: GET_CATEGORIES }).getCategories,
      ];
      const index = cacheCategories.findIndex(
        c => c._id === response.editCategory._id
      );
      cacheCategories[index] = response.editCategory;

      // Update local client store
      client.writeQuery({
        query: GET_CATEGORIES,
        data: {
          getCategories: cacheCategories,
        },
      });
    },
  });

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    onCompleted: response => {
      client.refetchQueries({ include: [GET_CATEGORIES] });
    },
  });

  return (
    <>
      <CategorySubtitle text="Categories" />
      <Box sx={{ ml: 2, mt: 1 }}>
        <Button variant="contained" onClick={openCreateDialog}>
          Create category
        </Button>
      </Box>

      <List>
        {data &&
          data.getCategories &&
          data.getCategories.map(category => (
            <Category
              key={category._id}
              category={category}
              openEditDialog={openEditDialog}
              openDeleteDialog={openDeleteDialog}
            />
          ))}
      </List>

      <ConfirmDialog
        open={deleteDialogOpen}
        closeCallback={() => setDeleteDialogOpen(false)}
        title={`Delete category?`}
        text="This will delete the category, but the items that are associated with this category will remain in the database."
        cancelText="Cancel"
        acceptText="Delete"
        acceptCallback={() => {
          deleteCategoryMutation({
            variables: { id: deleteDialogCategory._id },
          });
        }}
      />

      <CategoryDialog
        open={createDialogOpen}
        handleClose={() => {
          setCreateDialogOpen(false);
        }}
        createCategory={values => createCategoryMutation({ variables: values })}
      />

      <CategoryDialog
        open={editDialogOpen}
        handleClose={() => {
          setEditDialogOpen(false);
        }}
        values={editDialogCategory}
        editCategory={values =>
          editCategoryMutation({
            variables: { id: editDialogCategory._id, ...values },
          })
        }
      />
    </>
  );
};

export default ProductCategories;
