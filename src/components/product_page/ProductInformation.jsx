import { Typography, Button, Paper } from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import * as yup from "yup"
import { useFormik } from "formik"
import { formatPrice } from "../../utils/formatting"

import FormikProductCustomization from "./FormikProductCustomization"

import hash from "object-hash"

const ProductInformation = ({ product }) => {
  const { language } = useLanguage()
  const { addItemToCart } = useShoppingCart()

  const getInitialObject = (product) => {
    var newInitial = []

    for (let i = 0; i < product.customization.length; i++) {
      newInitial[i] = {
        label: product.customization[i].label,
        option: null,
      }
    }

    return newInitial
  }

  const formik = useFormik({
    initialValues: getInitialObject(product),
    validationSchema: yup.array().of(
      yup.object({
        label: yup.object(),
        option: yup.object().required(""),
      })
    ),
    onSubmit: (values) => {
      // Add a hash: products with same _id might appear in lists
      const selectedItem = {
        ...product,
        customization: values,
      }

      selectedItem.hash = hash(selectedItem)
      addItemToCart(selectedItem)
    },
  })

  return (
    <Paper elevation={4} sx={{ width: "40%", padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      >
        {product.name[language]}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      >
        {formatPrice(product.price.EUR, language, "EUR")}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <FormikProductCustomization
          formik={formik}
          product={product}
          language={language}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Add to shopping cart
        </Button>
      </form>
    </Paper>
  )
}

export default ProductInformation
