import { Box } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "../../graphql/queries"
import { useParams } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"

import Pictures from "./pictures/Pictures"
import Panel from "./panel/Panel"
import Extras from "./extras/Extras"

import Loading from "../general/Loading"

const ProductPage = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const { data } = useQuery(GET_PRODUCT, {
    variables: { id, language, currency: "EUR" },
  })

  return (
    <>
      {data && data.getProductById ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Pictures sx={{ width: "60%" }} />
            <Panel product={data.getProductById} />
          </Box>

          <Extras />
        </Box>
      ) : (
        <Loading
          size={32}
          sx={{
            position: "absolute",
            left: "50%",
            top: "25%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  )
}

export default ProductPage
