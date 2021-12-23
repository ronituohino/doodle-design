import { useState, useEffect } from "react"

import {
  IconButton,
  MenuItem,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ClearIcon from "@mui/icons-material/Clear"

import { useLanguage } from "../../../hooks/useLanguage"

import { hasParentWithMatchingSelector } from "../../../utils/utils.js"

import { formatPrice } from "../../../utils/price"
import { useRouting } from "../../../hooks/useRouting"

const ShoppingCartItem = ({ cartObject }) => {
  const {
    setAmount,
    increaseAmount,
    decreaseAmount,
    removeItemFromCart,
  } = useShoppingCart()
  const { language } = useLanguage()
  const { openItem } = useRouting()

  const [itemAmount, setItemAmount] = useState(cartObject.amount)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // Updates itemAmount when amount is modified outside
  useEffect(() => {
    setItemAmount(cartObject.amount)
  }, [cartObject.amount])

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
      if (number <= 0) {
        setDeleteConfirm(true)
        setItemAmount(cartObject.amount)
      } else {
        setItemAmount(e.target.value)
        setAmount(cartObject.item, number)
      }
    }
  }

  // If the cart is closed while input is empty, set amount to 1
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setItemAmount(cartObject.amount)
    }
    setDeleteConfirm(false)
  }

  const checkLinkClick = (e) => {
    if (
      !hasParentWithMatchingSelector(
        e.target,
        "#product-controls",
        true
      )
    ) {
      openItem(cartObject.item.category, cartObject.item._id)
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
            borderRadius: 8,
            marginLeft: 6,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: 1.5,
            gap: "5px",
          }}
        >
          <Box sx={{ alignSelf: "center", width: 140 }}>
            <Typography
              variant="body1"
              noWrap
              sx={{
                fontWeight: "bold",
              }}
            >
              {cartObject.item.name}
            </Typography>

            {cartObject.item.customization &&
              cartObject.item.customization.map((c) => {
                return (
                  <Typography
                    key={`${cartObject.item.hash}-${c.label}`}
                    variant="caption"
                    sx={{
                      color: "grey",
                    }}
                  >
                    {c.label}: {c.option}
                  </Typography>
                )
              })}
          </Box>

          <Box
            sx={{
              alignSelf: "center",
              width: 80,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {formatPrice(
                cartObject.item.price * cartObject.amount,
                language,
                "EUR"
              )}
            </Typography>
          </Box>

          {!deleteConfirm && (
            <Box
              id="product-controls"
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: 1,
                paddingLeft: 1,
                height: 80,
              }}
            >
              <IconButton
                disabled={cartObject.amount < 99 ? false : true}
                disableRipple
                sx={{
                  width: 16,
                  height: 16,
                  alignSelf: "center",
                  paddingBottom: 1.5,
                }}
                onClick={() => {
                  increaseAmount(cartObject.item)
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>

              <TextField
                value={itemAmount}
                onChange={handleValueChange}
                onBlur={handleBlur}
                size="small"
                sx={{
                  textAlign: "center",
                  alignSelf: "center",
                  width: 46,
                }}
                inputProps={{
                  style: { textAlign: "center" },
                }}
              />

              <IconButton
                disabled={cartObject.amount <= 1 ? true : false}
                disableRipple
                sx={{
                  width: 16,
                  height: 16,
                  alignSelf: "center",
                  paddingTop: 1.5,
                }}
                onClick={() => decreaseAmount(cartObject)}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Box>
          )}
          {deleteConfirm && (
            <Box
              id="product-controls"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 46,
                height: 80,
              }}
            >
              <Button
                onClick={() => removeItemFromCart(cartObject.item)}
              >
                Delete
              </Button>
              <Button onClick={() => setDeleteConfirm(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        {!deleteConfirm && (
          <IconButton
            id="product-controls"
            disableRipple
            sx={{
              width: 16,
              height: 16,
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
            onClick={() => setDeleteConfirm(true)}
          >
            <ClearIcon />
          </IconButton>
        )}
      </MenuItem>
    </>
  )
}

export default ShoppingCartItem
