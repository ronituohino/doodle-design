import { Box, Container, Card, CardMedia, Typography } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEMS } from "./queries/queries"

const Content = () => {
  const { data } = useQuery(GET_ITEMS, {
    variables: { language: "FI" },
  })

  return (
    <>
      <Container
        sx={{
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {data ? (
            data.allItems.map((i) => <ItemCard key={i.id} item={i} />)
          ) : (
            <p>loading...</p>
          )}
        </Box>
      </Container>
    </>
  )
}

const ItemCard = ({ item }) => {
  return (
    <>
      <Box
        style={{
          width: "200px",
          height: "250px",
          margin: 2,
        }}
      >
        <Card
          elevation={4}
          sx={{
            margin: "auto",
            width: "190px",
            height: "190px",
            borderRadius: 4,
            marginBottom: "-6px",
          }}
        >
          <CardMedia
            component="img"
            image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="name"
          />
        </Card>
        <Box
          style={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: "10px",
              marginBottom: "-5px",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: 0.8,
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: 0.8,
            }}
          >
            {item.price}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default Content
