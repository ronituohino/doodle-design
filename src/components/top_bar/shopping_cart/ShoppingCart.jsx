import { useState } from "react"
import {
  Badge,
  IconButton,
  Menu,
  Button,
  Divider,
  Box,
  Typography,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { SHOPPING_CART } from "../../../graphql/queries.js"
import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import ShoppingCartItem from "./ShoppingCartItem"

import { formatPrice } from "../../../utils/price.js"
import { useLanguage } from "../../../hooks/useLanguage.js"
import { useRouting } from "../../../hooks/useRouting.js"

const ShoppingCart = () => {
  const { data } = useQuery(SHOPPING_CART)
  const { language } = useLanguage()
  const { openCheckout } = useRouting()
  const [anchorEl, setAnchorEl] = useState(null)

  const { totalAmountOfItems } = useShoppingCart()
  const total = totalAmountOfItems()

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

  const calculateSubTotal = () => {
    let sum = 0
    data.cartItems.forEach((e) => (sum += e.amount * e.item.price))
    return sum
  }

  return (
    <>
      <IconButton
        color="inherit"
        sx={{ margin: "4px" }}
        onClick={openMenu}
        aria-label={notificationsLabel(total)}
      >
        <Badge badgeContent={total} color="secondary">
          <ShoppingCartIcon />
          <ArrowDropDownIcon sx={{ position: "absolute", top: 18 }} />
        </Badge>
      </IconButton>

      <Menu
        sx={{
          marginTop: 2,
        }}
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
        {total === 0 && <p>empty!</p>}
        {total > 0 &&
          data.cartItems.map((e) => (
            <ShoppingCartItem key={e.item.hash} element={e} />
          ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Typography
            sx={{
              marginLeft: 1,
              marginBottom: 1,
              fontWeight: "bold",
            }}
          >
            {`Subtotal: ${formatPrice(
              calculateSubTotal(),
              language,
              "EUR"
            )}`}
          </Typography>
        </Box>
        <Divider />
        <Button
          color="primary"
          onClick={() => {
            openCheckout()
            closeMenu()
          }}
        >
          Checkout
        </Button>
      </Menu>
    </>
  )
}

export default ShoppingCart
