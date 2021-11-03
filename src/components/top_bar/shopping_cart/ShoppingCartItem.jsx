import { useState, useEffect } from "react"

import {
  IconButton,
  MenuItem,
  Box,
  TextField,
  Typography,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import DeleteIcon from "@mui/icons-material/Delete"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

import { useLanguage } from "../../../hooks/useLanguage"
import { useHistory } from "react-router"

import { hasParentWithMatchingSelector } from "../../../utils/utils.js"

import { formatPrice } from "../../../utils/price"

const ShoppingCartItem = ({ element }) => {
  const history = useHistory()
  const {
    setAmount,
    increaseAmount,
    decreaseAmount,
    removeItemFromCart,
  } = useShoppingCart()
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
        divider
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
            borderRadius: 6,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 1,
            width: 250,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "normal",
              fontWeight: "bold",
            }}
          >
            {element.item.name}
          </Typography>

          <Box sx={{ flexBasis: "100%", height: 4 }} />

          <Box
            id="product-controls"
            sx={{
              display: "flex",
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

            {element.amount < 99 ? (
              <IconButton
                sx={{}}
                onClick={() => increaseAmount(element.item)}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {formatPrice(
                element.item.price * element.amount,
                language,
                "EUR"
              )}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    </>
  )
}

export default ShoppingCartItem
