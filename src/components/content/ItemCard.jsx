import ContentCard from "./ContentCard"
import { Box, Typography, IconButton } from "@mui/material"

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"

const ItemCard = ({ item }) => {
  return (
    <>
      <ContentCard
        link={`/product/${item.category.toLowerCase()}/${item.name.toLowerCase()}`}
        size={{ width: "200px", height: "300px" }}
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
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: 2.1,
          backgroundColor: "green",
        }}
      >
        <Typography
          variant="subtitle1"
          color="black"
          sx={{
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          {item.name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "yellow",
        }}
      >
        <Box
          sx={{
            flexGrow: 0.5,
            marginTop: 1,
          }}
        >
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

        <Box
          sx={{
            flexGrow: 0.5,
          }}
        >
          <IconButton
            color="default"
            sx={{ margin: "4px" }}
            onClick={() => console.log("helo")}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}

export default ItemCard
