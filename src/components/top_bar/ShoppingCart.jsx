import { useState } from "react"
import { Badge, IconButton, Menu, MenuItem } from "@mui/material"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const ShoppingCart = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [shoppingCartItems, setShoppingCartItems] = useState(3)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const notificationsLabel = (itemCount) => {
    if (itemCount === 0) {
      return "no items in shopping cart"
    } else if (itemCount > 99) {
      return "more than 99 items in shopping cart"
    } else if (itemCount === 1) {
      return "1 item in shopping cart"
    } else {
      return `${itemCount} items in shopping cart`
    }
  }

  return (
    <>
      <IconButton
        color="inherit"
        sx={{ margin: "4px" }}
        onClick={openMenu}
        aria-label={notificationsLabel(shoppingCartItems)}
      >
        <Badge badgeContent={shoppingCartItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
      </Menu>
    </>
  )
}

export default ShoppingCart
