import { Box, Container } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEM } from "../../graphql/queries"
import { useParams } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"

import ItemPictures from "./ItemPictures"
import ItemInformation from "./ItemInformation"
import ItemExtras from "./ItemExtras"

const ItemPage = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const { data } = useQuery(GET_ITEM, {
    variables: { id, language, currency: "EUR" },
  })

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginTop: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <ItemPictures sx={{ width: "60%" }} />

          <Box sx={{ width: "40%" }}>
            {data ? (
              <ItemInformation item={data.getItemById} />
            ) : (
              <p>loading...</p>
            )}
          </Box>
        </Box>

        <ItemExtras />
      </Container>
    </>
  )
}

export default ItemPage
