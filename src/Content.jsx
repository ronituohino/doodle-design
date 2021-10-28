import { Box, Container, Typography } from "@mui/material"

import { Link } from "react-router-dom"

import { useQuery } from "@apollo/client"
import { GET_ITEMS } from "./queries/queries"

import { useSpring, animated } from "react-spring"

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
  const [{ blurSpread }, api] = useSpring(() => ({ blurSpread: [12, 2] }))

  return (
    <>
      <Link
        to={`/product/${item.category.toLowerCase()}/${item.name.toLowerCase()}`}
        style={{ textDecoration: "none" }}
      >
        <animated.div
          onMouseEnter={() =>
            api.start({
              to: { blurSpread: [16, 8] },
              config: { tension: 210, friction: 20 },
            })
          }
          onMouseLeave={() =>
            api.start({
              to: { blurSpread: [12, 2] },
              config: { tension: 210, friction: 20 },
            })
          }
          style={{
            width: "200px",
            height: "280px",
            margin: 8,
            borderRadius: 16,
            boxShadow: blurSpread.to(
              (blur, spread) =>
                `0px 0px ${blur}px ${spread}px rgba(0, 0, 0, 0.2)`
            ),
          }}
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
        </animated.div>
      </Link>
    </>
  )
}

export default Content
