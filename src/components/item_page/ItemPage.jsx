import { Box, Container, Typography } from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEM } from "../../queries/queries"
import { useParams } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"
import { formatPrice } from "../../utils/price"

const ItemPage = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const { data } = useQuery(GET_ITEM, {
    variables: { id, language, currency: "EUR" },
  })

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <ItemPictures />
        </Box>

        <Box>
          {data ? (
            <ItemInformation item={data.getItem} />
          ) : (
            <p>loading...</p>
          )}
        </Box>

        <Box sx={{ flexBasis: "100%", height: 0 }} />

        <Box>
          <ItemExtras />
        </Box>
      </Container>
    </>
  )
}

const ItemPictures = ({ item }) => {
  return (
    <>
      <Typography>Main image</Typography>
      <Typography>Scaling sub thingy</Typography>
    </>
  )
}

const ItemInformation = ({ item }) => {
  const { language } = useLanguage()
  return (
    <>
      <Typography>{item.name}</Typography>
      <Typography>
        {formatPrice(item.price, language, "EUR")}
      </Typography>

      <Typography>Options</Typography>
    </>
  )
}

// Description, ratings, etc
const ItemExtras = ({ item }) => {
  return (
    <>
      <Typography>Desc</Typography>
    </>
  )
}

export default ItemPage
