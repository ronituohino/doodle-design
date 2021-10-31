import { useState } from "react"
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { SHOPPING_CART } from "../../queries/queries.js"
import { totalAmountOfItems } from "../../utils/shoppingCart"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ClearIcon from "@mui/icons-material/Clear"

const ShoppingCart = () => {
  const { data } = useQuery(SHOPPING_CART)
  const [anchorEl, setAnchorEl] = useState(null)

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
        aria-label={notificationsLabel(totalAmountOfItems())}
      >
        <Badge badgeContent={totalAmountOfItems()} color="secondary">
          <ShoppingCartIcon />
          <ArrowDropDownIcon sx={{ position: "absolute", top: 18 }} />
        </Badge>
      </IconButton>

      <Menu
        sx={{ marginTop: 2 }}
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
        {totalAmountOfItems() > 0 ? (
          <ShoppingCartItems cartItems={data.cartItems} />
        ) : (
          <p>empty!</p>
        )}
      </Menu>
    </>
  )
}

const ShoppingCartItems = ({ cartItems }) => {
  return (
    <>
      {cartItems.map((e) => (
        <ShoppingCartItem key={e.item.id} element={e} />
      ))}
    </>
  )
}

const ShoppingCartItem = ({ element }) => {
  const amountInputChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <MenuItem dense disableTouchRipple={true}>
        <Box
          sx={{ display: "flex", flexDirection: "row" }}
          onClick={() => console.log("click!")}
        >
          <img
            component="img"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="name"
            style={{
              margin: "auto",
              width: "50px",
              height: "50px",
              borderRadius: 4,
            }}
          />
          <p>{element.item.name}</p>
        </Box>
        <TextField
          value={element.amount}
          onChange={amountInputChange}
        />
        <IconButton onClick={() => console.log("del!")}>
          <ClearIcon />
        </IconButton>
      </MenuItem>
    </>
  )
}

export default ShoppingCart
