import { Container, Card, CardMedia } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEMS } from "./queries/queries"

const Content = () => {
  const { data } = useQuery(GET_ITEMS, {
    variables: { language: "FI" },
  })

  return (
    <>
      <div
        style={{
          marginTop: 16,
        }}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {data ? (
              data.allItems.map((i) => <ItemCard key={i.id} item={i} />)
            ) : (
              <p>loading...</p>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

const ItemCard = ({ item }) => {
  return (
    <div
      style={{
        backgroundColor: "red",
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
      <div
        style={{
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "-10px" }}>{item.name}</p>
        <p>{item.price}</p>
      </div>
    </div>
  )
}

export default Content
