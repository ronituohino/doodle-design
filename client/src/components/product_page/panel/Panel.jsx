import { Box, Typography, Button, Paper } from "@mui/material"

import { useLanguage } from "../../../hooks/useLanguage"
import { useShoppingCart } from "../../../hooks/useShoppingCart"
import * as yup from "yup"
import { useFormik } from "formik"
import { formatPrice } from "../../../utils/formatting"

import FormikProductCustomization from "./FormikProductCustomization"

import hash from "object-hash"
import { useEffect } from "react"
import { getText } from "../../../utils/dictionary"

const Panel = ({ product }) => {
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
  })

  // eslint-disable-next-line
  useEffect(() => formik.validateForm(), [])

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
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
        <Typography sx={{ mt: 2 }}>
          {product.description[language]}
        </Typography>
      </Box>

      <Box sx={{ flexBasis: "100%" }} />

      <Box sx={{ mt: 2 }}>
        <FormikProductCustomization
          formik={formik}
          product={product}
          language={language}
        />
        <Button
          disabled={!formik.isValid}
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            // Add a hash: products with same _id might appear in lists
            const selectedProduct = {
              ...product,
              customization: [...formik.values],
            }

            selectedProduct.hash = hash(selectedProduct)
            addItemToCart(selectedProduct)
          }}
        >
          {getText(language, "addToCartText")}
        </Button>
      </Box>
    </Paper>
  )
}

export default Panel
