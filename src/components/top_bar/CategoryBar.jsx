import { Box, Button } from "@mui/material"
import { useRouting } from "../../hooks/useRouting"

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
  const { openCategory } = useRouting()

  return (
    <>
      <Button
        variant="text"
        sx={{ margin: "4px", color: "white" }}
        onClick={() => openCategory(name)}
      >
        {name}
      </Button>
    </>
  )
}

export default CategoryBar
