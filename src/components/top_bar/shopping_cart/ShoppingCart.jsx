import { useRef, useState } from "react"
import {
  Badge,
  IconButton,
  Menu,
  Button,
  Divider,
  Box,
  Typography,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import ShoppingCartItem from "./ShoppingCartItem"

import { formatPrice } from "../../../utils/price.js"
import { useLanguage } from "../../../hooks/useLanguage.js"
import { useRouting } from "../../../hooks/useRouting.js"

const ShoppingCart = () => {
  const { language } = useLanguage()
  const { openCheckout } = useRouting()
  const [anchorEl, setAnchorEl] = useState(null)

  const { data, totalAmountOfItems, totalPriceOfItems } =
    useShoppingCart()
  const totalAmount = totalAmountOfItems()
  const totalPrice = totalPriceOfItems()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const childRef = useRef()
  const closeMenu = () => {
    setAnchorEl(null)
    if (childRef.current) {
      childRef.current.onClose()
    }
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
        aria-label={notificationsLabel(totalAmount)}
      >
        <Badge badgeContent={totalAmount} color="secondary">
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
        <Box sx={{ width: 420 }}>
          {totalAmount === 0 && <p>empty!</p>}
          {totalAmount > 0 &&
            data.cartItems.map((obj) => (
              <ShoppingCartItem
                key={obj.item.hash}
                cartObject={obj}
                ref={childRef}
              />
            ))}
        </Box>

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
            {`Total: ${formatPrice(totalPrice, language, "EUR")}`}
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
