import {
  ListItem,
  Box,
  Icon,
  IconButton,
  Button,
  ListItemText,
  Divider,
} from "@mui/material"
import { getFile } from "../../../utils/getFile"

const ProductLine = ({
  product,
  language,
  openVisibilityDialog,
  openModifyDialog,
  openDeleteDialog,
}) => {
  return (
    <>
      <Divider variant="middle" />
      <ListItem>
        <img
          component="img"
          src={getFile(
            product.images[0]._id,
            product.images[0].filename
          )}
          alt={product.name[language]}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: 8,
          }}
        />
        <ListItemText sx={{ paddingLeft: 1 }}>
          {product.name[language]}
        </ListItemText>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton onClick={() => openVisibilityDialog(product)}>
            {product.visible ? (
              <Icon>visibility</Icon>
            ) : (
              <Icon>visibility_off</Icon>
            )}
          </IconButton>
          <Button
            onClick={() => openModifyDialog(product)}
            variant="contained"
          >
            Modify
          </Button>
          <Button
            onClick={() => openDeleteDialog(product)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </ListItem>
    </>
  )
}

export default ProductLine
