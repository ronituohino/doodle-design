import { useHistory } from "react-router"
import { Box, Button } from "@mui/material"

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
            <Category name="apples" />
            <Category name="pears" />
            <Category name="bananas" />
            <Category name="watermelons" />
            <Category name="kiwis" />
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
  const press = () => {
    history.push(`/product/${name}`)
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
