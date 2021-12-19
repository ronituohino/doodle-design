import { useHistory } from "react-router-dom"
import { Box, Button } from "@mui/material"
import { useLanguage } from "../../hooks/useLanguage"

const CategoryBar = ({ searchDisabled }) => {
  return (
    <>
      <Box
        sx={{
          left: "20%",
          right: "20%",
          marginLeft: 0,
          marginRight: "auto",

          position: "absolute",
          display: "flex",

          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {searchDisabled ? (
          <>
            <Category name="fruits" />
            <Category name="cars" />
            <Category name="phones" />
            <Category name="beds" />
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  )
}

const Category = ({ name }) => {
  const history = useHistory()
  const { language } = useLanguage()

  const press = () => {
    history.push(`/${language}/product/${name}`)
  }

  return (
    <>
      <Button
        variant="text"
        sx={{ margin: "4px", color: "white" }}
        onClick={press}
      >
        {name}
      </Button>
    </>
  )
}

export default CategoryBar
