import { useState, useEffect } from "react"
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  Typography,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { SHOPPING_CART } from "../../queries/queries.js"
import {
  totalAmountOfItems,
  setAmount,
  removeItemFromCart,
} from "../../utils/shoppingCart"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import DeleteIcon from "@mui/icons-material/Delete"
import { useHistory } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"

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

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setItemAmount(element.amount)
    }
  }

  return (
    <>
      <MenuItem
        disableTouchRipple={true}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Box
          onClick={() =>
            history.push(
              `/${language}/product/${element.item.category.toLowerCase()}/${
                element.item.id
              }`
            )
          }
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <img
            component="img"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
            alt="name"
            style={{
              width: 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <Typography style={{ paddingLeft: 6, paddingRight: 6 }}>
            {element.item.name}
          </Typography>
        </Box>

        <TextField
          value={itemAmount}
          onChange={handleValueChange}
          onBlur={handleBlur}
          size="small"
          sx={{
            width: 44,
            textAlign: "center",
            justifySelf: "flex-end",
          }}
          inputProps={{
            style: { textAlign: "center", fontSize: 14 },
          }}
        />
        <IconButton
          sx={{ marginLeft: 0.5, marginRight: -1.5 }}
          onClick={() => removeItemFromCart(element.item)}
        >
          <DeleteIcon />
        </IconButton>
      </MenuItem>
    </>
  )
}

export default ShoppingCart
