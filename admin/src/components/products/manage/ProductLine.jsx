import { useState } from "react"

import ConfirmDialog from "../../general/ConfirmDialog"
import ModifyProductDialog from "./ModifyProductDialog"

import {
  ListItem,
  Box,
  Icon,
  IconButton,
  Button,
  ListItemText,
  Divider,
} from "@mui/material"
import getFile from "../../../utils/getFile"
import { useMutation } from "@apollo/client"
import { EDIT_PRODUCT } from "../../../graphql/mutations"
import { useSnackbar } from "notistack"

const ProductLine = ({ product, language }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [editProductMutation] = useMutation(EDIT_PRODUCT, {
    onCompleted: () => {
      enqueueSnackbar("Product updated!", {
        variant: "success",
      })
    },
  })

  const [visibilityDialogOpen, setVisibilityDialogOpen] =
    useState(false)
  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  console.log(product)
  return (
    <>
      <ConfirmDialog
        open={visibilityDialogOpen}
        closeCallback={() => setVisibilityDialogOpen(false)}
        title={`Change product visibility to ${
          product.visible ? "hidden" : "visible"
        }?`}
        text={`This will make the product ${
          product.visible ? "hidden from" : "visible to"
        } all users in the store`}
        cancelText="Cancel"
        acceptText={`${
          product.visible ? "Make hidden" : "Make visible"
        }`}
        acceptCallback={() =>
          editProductMutation({
            variables: { id: product._id, visible: !product.visible },
          })
        }
      />

      <ModifyProductDialog
        open={modifyDialogOpen}
        handleClose={() => setModifyDialogOpen(false)}
        overrideValues={product}
        overrideSubmit={(values) => console.log(values)}
      />

      <Divider variant="middle" />
      <ListItem>
        <img
          component="img"
          src={getFile(
            product.images[0]._id,
            product.images[0].filename
          )}
          alt={product.name[`${language}`]}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: 8,
          }}
        />
        <ListItemText sx={{ paddingLeft: 1 }}>
          {product.name[`${language}`]}
        </ListItemText>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton onClick={() => setVisibilityDialogOpen(true)}>
            {product.visible ? (
              <Icon>visibility</Icon>
            ) : (
              <Icon>visibility_off</Icon>
            )}
          </IconButton>
          <Button
            onClick={() => setModifyDialogOpen(true)}
            variant="contained"
          >
            Modify
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </ListItem>
    </>
  )
}

export default ProductLine
