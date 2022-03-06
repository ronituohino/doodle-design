import { Paper, Typography, Box, Divider } from "@mui/material"

import ProductCard from "../products/ProductCard"
import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "../../graphql/queries"
import PointIcon from "./PointIcon"

const Home = () => {
  const sneakerQuery = useQuery(GET_PRODUCT, {
    variables: {
      id: "61f51b243c71ee71cd527222",
    },
  })

  const sockDotQuery = useQuery(GET_PRODUCT, {
    variables: {
      id: "61f51b243c71ee71cd527231",
    },
  })

  const sockStripeQuery = useQuery(GET_PRODUCT, {
    variables: {
      id: "61f51b243c71ee71cd527232",
    },
  })

  const sockZebraQuery = useQuery(GET_PRODUCT, {
    variables: {
      id: "61f51b243c71ee71cd527233",
    },
  })

  console.log(sneakerQuery)

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Experience new era of clothing - Doodle Design!
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            ml: 4,
            mr: 4,
          }}
        >
          <Box
            sx={{
              p: 1,
              alignSelf: "center",
            }}
          >
            <Typography color="grey.700">
              Doodle Design is an environmentally friendly clothing
              line that creates products that people want to wear.
            </Typography>
            <Typography color="grey.700" sx={{ mt: 1 }}>
              Our goal is to bring together designers and the general
              public to work on new clothing.
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 1.3,
              display: "flex",
              gap: "15px",
              alignSelf: "center",
            }}
          >
            <PointIcon
              icon="recycling"
              text="High-quality recycled materials"
              textColor="grey.700"
            />
            <PointIcon
              icon="handshake"
              text="Customer recommendations and needs"
              textColor="grey.700"
            />
            <PointIcon
              icon="public"
              text="A friendly design suitable for everyone"
              textColor="grey.700"
            />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 4, display: "flex" }}>
        <>
          {sneakerQuery.data && sneakerQuery.data.getProductById && (
            <Paper sx={{ display: "flex", p: 2, gap: "10px" }}>
              <Box>
                <Typography variant="h5" sx={{ width: "150px" }}>
                  A hot pick for the summer
                </Typography>
                <Typography
                  color="grey.700"
                  sx={{ width: "150px", mt: 2 }}
                >
                  The official Doodle Design Sneakers are finally
                  here, 100% made with recycled ocean plastics.
                </Typography>
              </Box>
              <ProductCard
                product={sneakerQuery.data.getProductById}
              />
            </Paper>
          )}
        </>
        <>
          {sockDotQuery.data &&
            sockDotQuery.data.getProductById &&
            sockStripeQuery.data &&
            sockStripeQuery.data.getProductById &&
            sockZebraQuery.data &&
            sockZebraQuery.data.getProductById && (
              <Paper sx={{ p: 2, ml: 4 }}>
                <Typography variant="h6">
                  Also check out our socks to go with!
                </Typography>
                <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                  <ProductCard
                    product={sockDotQuery.data.getProductById}
                    size={{ x: "105px", y: "105px" }}
                    descriptionPadding={1}
                    sx={{ width: "105px", height: "210px" }}
                  />
                  <ProductCard
                    product={sockStripeQuery.data.getProductById}
                    size={{ x: "105px", y: "105px" }}
                    descriptionPadding={1}
                    sx={{ width: "105px", height: "210px" }}
                  />
                  <ProductCard
                    product={sockZebraQuery.data.getProductById}
                    size={{ x: "105px", y: "105px" }}
                    descriptionPadding={1}
                    sx={{ width: "105px", height: "210px" }}
                  />
                </Box>
                <Typography
                  color="grey.700"
                  sx={{ mt: 1.7, mb: -1, alignSelf: "center" }}
                >
                  These socks are made from bamboo
                </Typography>
              </Paper>
            )}
        </>
      </Box>

      <Paper sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, textAlign: "center" }}>
          Stay tuned for more to come...
        </Typography>
      </Paper>
    </Box>
  )
}

export default Home
