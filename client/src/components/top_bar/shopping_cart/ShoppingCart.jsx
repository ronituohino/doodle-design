import { useState } from "react"
import {
  Badge,
  IconButton,
  Menu,
  Button,
  Divider,
  Box,
  Typography,
  Icon,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartProduct from "./ShoppingCartProduct"

import { formatPrice } from "../../../utils/formatting"
import { useLanguage } from "../../../hooks/useLanguage"
import { useRouting } from "../../../hooks/useRouting"

const ShoppingCart = () => {
  const { language } = useLanguage()
  const { openLink, checkoutLink, inCheckout } = useRouting()
  const [anchorEl, setAnchorEl] = useState(null)

  const { data, totalAmountOfProducts, totalPriceOfProducts } =
    useShoppingCart()
  const totalAmount = totalAmountOfProducts()
  const totalPrice = totalPriceOfProducts()

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

  const disableCartButton = inCheckout()

  return (
    <>
      <Box sx={{ alignSelf: "center" }}>
        <IconButton
          disabled={disableCartButton}
          color="inherit"
          onClick={openMenu}
          aria-label={notificationsLabel(totalAmount)}
        >
          <Badge badgeContent={totalAmount} color="secondary">
            <Icon>shopping_cart</Icon>
          </Badge>
        </IconButton>
      </Box>

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
        {totalAmount === 0 && (
          <Box sx={{ p: 2, pb: 0 }}>
            <Typography
              color="grey.700"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Shopping cart empty, go add something!
            </Typography>
          </Box>
        )}
        {totalAmount > 0 && (
          <Box>
            {data.cartProducts.map((obj) => {
              return (
                <ShoppingCartProduct
                  key={obj.product.hash}
                  cartObject={obj}
                  closeMenu={closeMenu}
                />
              )
            })}

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

            <Box sx={{ display: "flex", gap: "10px", p: 1, pb: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  openLink(checkoutLink())
                  closeMenu()
                }}
              >
                Open Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Menu>
    </>
  )
}

export default ShoppingCart
