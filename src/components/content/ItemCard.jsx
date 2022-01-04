import { Box, Typography, Paper } from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"
import { formatPrice } from "../../utils/price"
import { useRouting } from "../../hooks/useRouting"
import { Link } from "react-router-dom"

const ItemCard = ({ item }) => {
  const { language } = useLanguage()
  const { itemLink } = useRouting()

  return (
    <Link to={itemLink(item.category, item._id)}>
      <Paper elevation={8}>
        <img
          component="img"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="name"
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
            color="black"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="subtitle1"
            color="black"
            sx={{
              textAlign: "center",
            }}
          >
            {formatPrice(item.price, language, "EUR")}
          </Typography>
        </Box>
      </Paper>
    </Link>
  )
}

export default ItemCard
