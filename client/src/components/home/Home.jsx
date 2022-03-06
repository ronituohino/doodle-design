import { Paper, Typography, Box, Divider } from "@mui/material"

import ProductCard from "../products/ProductCard"
import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "../../graphql/queries"
import PointIcon from "./PointIcon"
import { getText } from "../../utils/dictionary"
import { useLanguage } from "../../hooks/useLanguage"

const Home = () => {
  const { language } = useLanguage()

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

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {getText(language, "homeHeadline")}
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
              {getText(language, "homeExplanationOne")}
            </Typography>
            <Typography color="grey.700" sx={{ mt: 1 }}>
              {getText(language, "homeExplanationTwo")}
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
              text={getText(language, "homePointOneText")}
              iconColor="#81c784"
              textColor="grey.700"
            />
            <PointIcon
              icon="handshake"
              text={getText(language, "homePointTwoText")}
              iconColor="#ffb74d"
              textColor="grey.700"
            />
            <PointIcon
              icon="public"
              text={getText(language, "homePointThreeText")}
              iconColor="#64b5f6"
              textColor="grey.700"
            />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <>
          {sneakerQuery.data && sneakerQuery.data.getProductById && (
            <Paper sx={{ display: "flex", p: 2, gap: "30px" }}>
              <Box>
                <Typography variant="h5" sx={{ width: "150px" }}>
                  {getText(language, "sneakerPaperTitle")}
                </Typography>
                <Typography
                  color="grey.700"
                  sx={{ width: "150px", mt: 2 }}
                >
                  {getText(language, "sneakerPaperDescription")}
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
                  {getText(language, "socksPaperTitle")}
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
                  {getText(language, "socksPaperNote")}
                </Typography>
              </Paper>
            )}
        </>
      </Box>

      <Paper sx={{ mt: 4 }}>
        <Typography sx={{ p: 2, textAlign: "center" }}>
          {getText(language, "homeEndText")}
        </Typography>
      </Paper>
    </Box>
  )
}

export default Home
