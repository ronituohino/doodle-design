import { useState, useEffect } from "react"
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { SHOPPING_CART } from "../../queries/queries.js"
import {
  totalAmountOfItems,
  setAmount,
  removeItemFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../utils/shoppingCart"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import DeleteIcon from "@mui/icons-material/Delete"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

import { useHistory } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"
import { hasParentWithMatchingSelector } from "../../utils/utils.js"

const ShoppingCart = () => {
  const { data } = useQuery(SHOPPING_CART)
  const [anchorEl, setAnchorEl] = useState(null)
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
        {total > 0 ? (
          <ShoppingCartItems cartItems={data.cartItems} />
        ) : (
          <p>empty!</p>
        )}

        <Button color="primary">Checkout</Button>
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
  const history = useHistory()
  const { language } = useLanguage()

  const [itemAmount, setItemAmount] = useState(element.amount)

  // Updates itemAmount when amount is modified outside
  useEffect(() => {
    setItemAmount(element.amount)
  }, [element.amount])

  // Strict input filtering
  const filterInt = (value) => {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value)
    } else {
      return NaN
    }
  }

  // Called when user manually enters numbers,
  // all numbers and "" allowed

  // Also push changes to cache
  const handleValueChange = (e) => {
    if (e.target.value === "") {
      setItemAmount("")
      return
    }

    const number = filterInt(e.target.value)
    if (!isNaN(number) && number < 100) {
      setItemAmount(e.target.value)
      setAmount(element.item, number)
    }
  }

  // If the cart is closed while input is empty, set amount to 1
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setItemAmount(element.amount)
    }
  }

  const checkLinkClick = (e) => {
    if (
      !hasParentWithMatchingSelector(
        e.target,
        "#product-controls",
        true
      )
    ) {
      history.push(
        `/${language}/product/${element.item.category.toLowerCase()}/${
          element.item.id
        }`
      )
    }
  }

  return (
    <>
      <MenuItem
        disableTouchRipple={true}
        onClick={(e) => checkLinkClick(e)}
      >
        <img
          component="img"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="name"
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 1,
            width: 300,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {element.item.name}
          </Typography>

          <Box sx={{ flexBasis: "100%", height: 4 }} />

          <Box
            id="product-controls"
            sx={{
              display: "flex",
              backgroundColor: "red",
            }}
          >
            <IconButton
              sx={{}}
              onClick={() => {
                element.amount === 1
                  ? removeItemFromCart(element.item)
                  : decreaseAmount(element.item)
              }}
            >
              {element.amount === 1 ? (
                <DeleteIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
            </IconButton>

            <TextField
              value={itemAmount}
              onChange={handleValueChange}
              onBlur={handleBlur}
              size="small"
              sx={{
                width: 46,
                textAlign: "center",
                justifySelf: "flex-end",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />

            <IconButton
              sx={{}}
              onClick={() => increaseAmount(element.item)}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {element.item.price * element.amount}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    </>
  )
}

export default ShoppingCart
