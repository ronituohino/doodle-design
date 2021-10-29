import ContentCard from "./ContentCard"
import { Box, Typography } from "@mui/material"

const ItemCard = ({ item }) => {
  return (
    <>
      <ContentCard
        link={`/product/${item.category.toLowerCase()}/${item.name.toLowerCase()}`}
        size={{ width: "200px", height: "280px" }}
      >
        <ItemContent item={item} />
      </ContentCard>
    </>
  )
}

const ItemContent = ({ item }) => {
  return (
    <>
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
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />

      <Box
        sx={{
          textAlign: "center",
          marginTop: 2.1,
        }}
      >
        <Typography
          variant="subtitle1"
          color="black"
          sx={{
            marginBottom: "-5px",
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="black"
          sx={{
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          {item.price}
        </Typography>
      </Box>
    </>
  )
}

export default ItemCard
