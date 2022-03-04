import { Box, Typography, Paper } from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"

import { formatPrice } from "../../utils/formatting"

import { useRouting } from "../../hooks/useRouting"
import { Link } from "react-router-dom"
import { getFile } from "../../utils/getFile"

const ProductCard = ({ product }) => {
  const { language } = useLanguage()
  const { productLink } = useRouting()

  return (
    <Link
      to={productLink(product.category.urlPath, product._id)}
      style={{ textDecoration: "none" }}
    >
      <Paper elevation={4}>
        <img
          component="img"
          src={getFile(
            product.images[0]._id,
            product.images[0].filename
          )}
          alt={product.name[language]}
          style={{
            width: "200px",
            height: "200px",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />

        <Box sx={{ padding: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {product.name[language]}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
            }}
          >
            {formatPrice(product.price.EUR, language, "EUR")}
          </Typography>
        </Box>
      </Paper>
    </Link>
  )
}

export default ProductCard
