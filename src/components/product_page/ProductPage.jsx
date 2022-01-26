import { Box } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "../../graphql/queries"
import { useParams } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"

import ProductPictures from "./ProductPictures"
import ProductInformation from "./ProductInformation"
import ProductExtras from "./ProductExtras"

const ProductPage = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const { data } = useQuery(GET_PRODUCT, {
    variables: { id, language, currency: "EUR" },
  })

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <ProductPictures sx={{ width: "60%" }} />

        {data ? (
          <ProductInformation product={data.getProductById} />
        ) : (
          <p>loading...</p>
        )}
      </Box>

      <ProductExtras />
    </>
  )
}

export default ProductPage
