import ContentCard from "./ContentCard"
import { Box, Typography } from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"
import { formatPrice } from "../../utils/price"
import { useRouting } from "../../hooks/useRouting"

const ItemCard = ({ item }) => {
  const { language } = useLanguage()
  const { itemLink } = useRouting()

  return (
    <>
      <Box
        sx={{
          position: "relative",
          margin: 2,
          width: "200px",
          maxHeight: "325px",
        }}
      >
        <ContentCard
          link={itemLink(item.category, item._id)}
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
