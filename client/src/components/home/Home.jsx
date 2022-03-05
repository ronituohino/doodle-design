import { Paper, Typography, Box } from "@mui/material"

import ProductCard from "../products/ProductCard"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS } from "../../graphql/queries"

const Home = () => {
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
        searchWord: "Socks",
        searchLanguage: "en",
      },
    },
  })

  console.log(sneakerQuery)

  return (
    <Box>
      <Paper>
        <Typography>Helo</Typography>
      </Paper>
      <Box sx={{ mt: 4, display: "flex", gap: "20px" }}>
        <>
          {sneakerQuery.data &&
            sneakerQuery.data.getProducts &&
            sneakerQuery.data.getProducts.docs &&
            sneakerQuery.data.getProducts.docs.length > 0 && (
              <Paper>
                <Typography>Sneakers display</Typography>
                <ProductCard
                  product={sneakerQuery.data.getProducts.docs[0]}
                />
              </Paper>
            )}
        </>

        <>
          {sockQuery.data &&
            sockQuery.data.getProducts &&
            sockQuery.data.getProducts.docs.length > 0 && (
              <Paper sx={{ display: "flex", gap: "30px", p: 2 }}>
                <Typography sx={{ alignSelf: "center" }}>
                  Awesome
                </Typography>
                <ProductCard
                  product={sockQuery.data.getProducts.docs[0]}
                  sx={{ display: "absolute" }}
                />
              </Paper>
            )}
        </>
      </Box>
    </Box>
  )
}

export default Home
