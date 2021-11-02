import ContentCard from "./ContentCard"
import { Box, Typography, Fab } from "@mui/material"

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { addItemToCart } from "../../utils/shoppingCart"

import { useLanguage } from "../../hooks/useLanguage"
import { formatPrice } from "../../utils/price"

const ItemCard = ({ item }) => {
  const { language } = useLanguage()
  return (
    <>
      <Box
        sx={{
          position: "relative",
          margin: 2.5,
          width: "200px",
          maxHeight: "325px",
        }}
      >
        <ContentCard
          link={`/${language}/product/${item.category.toLowerCase()}/${
            item.id
          }`}
          size={{ width: "200px", height: "200px" }}
        >
          <img
            component="img"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="name"
            style={{
              margin: "auto",
              width: "200px",
              height: "200px",
              marginBottom: "-6px",
              borderRadius: 16,
            }}
          />
        </ContentCard>

        <Fab
          sx={{ position: "absolute", right: -25, top: 175 }}
          onClick={() => addItemToCart(item)}
        >
          <AddShoppingCartIcon />
        </Fab>

        <Box sx={{ marginTop: 1.5 }}>
          <Typography
            variant="subtitle1"
            color="black"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing: 0.5,
            }}
          >
            {item.name}
          </Typography>

          <Box sx={{ flexBasis: "100%", height: 0 }} />

          <Typography
            variant="subtitle1"
            color="black"
            sx={{
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            {formatPrice(item.price, language, "EUR")}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ItemCard
