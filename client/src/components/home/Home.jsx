import { Paper, Typography, Box, Divider } from "@mui/material"

import ProductCard from "../products/ProductCard"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../../graphql/queries"
import PointIcon from "./PointIcon"
import { getText } from "../../utils/dictionary"
import { useLanguage } from "../../hooks/useLanguage"

const Home = () => {
  const { language } = useLanguage()

  // A tagging system would be a lot handier here
  const sneakerQuery = useQuery(GET_PRODUCTS, {
    variables: {
      page: 0,
      size: 1,
      search: {
        searchWord: "Sneakers",
        searchLanguage: "en",
      },
    },
  })

  const sockQuery = useQuery(GET_PRODUCTS, {
    variables: {
      page: 0,
      size: 3,
      search: {
        searchWord: "Summer Socks",
        searchLanguage: "en",
      },
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
          {sneakerQuery.data &&
            sneakerQuery.data.getProducts &&
            sneakerQuery.data.getProducts.docs.length === 1 && (
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
                  product={sneakerQuery.data.getProducts.docs[0]}
                />
              </Paper>
            )}
        </>
        <>
          {sockQuery.data &&
            sockQuery.data.getProducts &&
            sockQuery.data.getProducts.docs.length === 3 && (
              <Paper sx={{ p: 2, ml: 4 }}>
                <Typography variant="h6">
                  {getText(language, "socksPaperTitle")}
                </Typography>
                <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                  <ProductCard
                    product={sockQuery.data.getProducts.docs[0]}
                    size={{ x: "130px", y: "130px" }}
                    descriptionPadding={1}
                    sx={{ width: "130px", height: "240px" }}
                  />
                  <ProductCard
                    product={sockQuery.data.getProducts.docs[1]}
                    size={{ x: "130px", y: "130px" }}
                    descriptionPadding={1}
                    sx={{ width: "130px", height: "240px" }}
                  />
                  <ProductCard
                    product={sockQuery.data.getProducts.docs[2]}
                    size={{ x: "130px", y: "130px" }}
                    descriptionPadding={1}
                    sx={{ width: "130px", height: "240px" }}
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
