import { Box } from "@mui/material"

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <ItemPictures sx={{ width: "60%" }} />

        {data ? (
          <ItemInformation item={data.getItemById} />
        ) : (
          <p>loading...</p>
        )}
      </Box>

      <ItemExtras />
    </>
  )
}

export default ItemPage
