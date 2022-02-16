import {
  ListItem,
  Box,
  Icon,
  IconButton,
  Button,
  ListItemText,
  Divider,
} from "@mui/material"

const ProductLine = ({ product, language }) => {
  console.log(product)
  return (
    <>
      <Divider variant="middle" />
      <ListItem>
        <img
          component="img"
          src="/files/images/61f51b243c71ee71cd527114-test.png"
          alt={product.name[`${language}`]}
          style={{
            width: "50px",
            height: "50px",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            paddingRight: 8,
          }}
        />
        <ListItemText>{product.name[`${language}`]}</ListItemText>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton>
            <Icon>visibility</Icon>
          </IconButton>
          <Button variant="contained">Modify</Button>
          <Button color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </ListItem>
    </>
  )
}

export default ProductLine
