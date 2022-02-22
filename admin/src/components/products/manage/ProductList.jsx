import { List, Box, Pagination, Divider } from "@mui/material"

import {
  useQuery,
  useMutation,
  useApolloClient,
} from "@apollo/client"
import { GET_PRODUCTS } from "../../../graphql/queries"
import {
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "../../../graphql/mutations"

import ConfirmDialog from "../../general/ConfirmDialog"
import ProductDialog from "./dialog/ProductDialog"

import Loading from "../../general/Loading"
import ProductLine from "./ProductLine"
import { useState } from "react"
import { useLanguage } from "../../../hooks/useLanguage"
import { useSnackbar } from "notistack"

const ProductList = ({ productSearchFilter }) => {
  const client = useApolloClient()
  const { enqueueSnackbar } = useSnackbar()
  const { language } = useLanguage()

  const [page, setPage] = useState(0)
  // eslint-disable-next-line
  const [size, setSize] = useState(10)

  const { data, error } = useQuery(GET_PRODUCTS, {
    variables: {
      page,
      size,
      search: {
        searchWord: productSearchFilter,
        searchLanguage: language,
      },
    },
  })

  const [editProductMutation] = useMutation(EDIT_PRODUCT, {
    onCompleted: () => {
      enqueueSnackbar("Product updated!", {
        variant: "success",
      })

      // Refetch GET_PRODUCTS query
      client.refetchQueries({
        include: [GET_PRODUCTS],
      })
    },
  })
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => {
      enqueueSnackbar("Product deleted!", {
        variant: "success",
      })

      // Refetch GET_PRODUCTS query
      client.refetchQueries({
        include: [GET_PRODUCTS],
      })
    },
  })

  const [visibilityDialogOpen, setVisibilityDialogOpen] =
    useState(false)
  const [visibilityDialogProduct, setVisiblityDialogProduct] =
    useState(false)
  const openVisibilityDialog = (product) => {
    setVisibilityDialogOpen(true)
    setVisiblityDialogProduct(product)
  }

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [modifyDialogProduct, setModifyDialogProduct] =
    useState(false)
  const openModifyDialog = (product) => {
    setModifyDialogOpen(true)
    setModifyDialogProduct(product)
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteDialogProduct, setDeleteDialogProduct] =
    useState(false)
  const openDeleteDialog = (product) => {
    setDeleteDialogOpen(true)
    setDeleteDialogProduct(product)
  }

  // callback from bottom pagination component
  const changePage = (event, value) => {
    setPage(value - 1) // backend pagination starts from 0
  }

  return (
    <>
      {error && <p>something went wrong...</p>}
      {!error && (
        <>
          <List>
            {!data && <Loading size={16} />}
            {data &&
              data.getProducts.docs.map((p) => (
                <ProductLine
                  key={p._id}
                  product={p}
                  language={language}
                  openVisibilityDialog={openVisibilityDialog}
                  openModifyDialog={openModifyDialog}
                  openDeleteDialog={openDeleteDialog}
                />
              ))}
            <Divider variant="middle" />
          </List>

          <ConfirmDialog
            open={visibilityDialogOpen}
            closeCallback={() => setVisibilityDialogOpen(false)}
            title={`Change product visibility to ${
              visibilityDialogProduct.visible ? "hidden" : "visible"
            }?`}
            text={`This will make the product ${
              visibilityDialogProduct.visible
                ? "hidden from"
                : "visible to"
            } all users in the store`}
            cancelText="Cancel"
            acceptText={`${
              visibilityDialogProduct.visible
                ? "Make hidden"
                : "Make visible"
            }`}
            acceptCallback={() => {
              editProductMutation({
                variables: {
                  id: visibilityDialogProduct._id,
                  visible: !visibilityDialogProduct.visible,
                },
              })
            }}
          />

          <ProductDialog
            open={modifyDialogOpen}
            handleClose={() => setModifyDialogOpen(false)}
            overrideValues={
              modifyDialogProduct
                ? {
                    pictures: modifyDialogProduct.images,
                    category: modifyDialogProduct.category._id,
                    name: modifyDialogProduct.name,
                    description: modifyDialogProduct.description,
                    price: modifyDialogProduct.price,
                    customization: modifyDialogProduct.customization,
                  }
                : null
            }
            overrideSubmit={(values) => {
              editProductMutation({
                variables: {
                  id: modifyDialogProduct._id,
                  category: values.category,
                  customization: values.customization,
                  name: values.name,
                  images: values.pictureIdList,
                  description: values.description,
                  price: values.price,
                },
              })
            }}
          />

          <ConfirmDialog
            open={deleteDialogOpen}
            closeCallback={() => setDeleteDialogOpen(false)}
            title={
              deleteDialogProduct
                ? `Delete product ${deleteDialogProduct.name[language]}?`
                : "Delete product?"
            }
            text="This action will delete the product from the store along with the product page -> any orders made cannot display more information on this product"
            cancelText="Cancel"
            acceptText="Delete"
            acceptCallback={() => {
              deleteProductMutation({
                variables: { id: deleteDialogProduct._id },
              })
            }}
          />

          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data && (
              <Pagination
                count={data.getProducts.totalPages}
                page={page + 1} // backend pagination starts from 0
                onChange={changePage}
              />
            )}
          </Box>
        </>
      )}
    </>
  )
}

export default ProductList
