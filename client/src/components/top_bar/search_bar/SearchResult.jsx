import { Box, MenuItem, Typography } from "@mui/material"
import { getFile } from "../../../utils/getFile"
import { formatPrice } from "../../../utils/formatting"
import { useRouting } from "../../../hooks/useRouting"

const SearchResult = ({ product, language }) => {
  const { openLink, productLink } = useRouting()
  return (
    <MenuItem
      onClick={() =>
        openLink(productLink(product.category.urlPath, product._id))
      }
    >
      <img
        component="img"
        src={getFile(
          product.images[0]._id,
          product.images[0].filename
        )}
        alt={product.name[language]}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: 8,
        }}
      />
      <Typography sx={{ paddingLeft: 1 }}>
        {product.name[language]}
      </Typography>
      <Box sx={{ ml: 8 }}>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
          }}
        >
          {formatPrice(product.price.EUR, language, "EUR")}
        </Typography>
      </Box>
    </MenuItem>
  )
}

export default SearchResult
