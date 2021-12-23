import { useState, useEffect } from "react"

import {
  IconButton,
  MenuItem,
  Box,
  TextField,
  Typography,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useLanguage } from "../../../hooks/useLanguage"

import { hasParentWithMatchingSelector } from "../../../utils/utils.js"

import { formatPrice } from "../../../utils/price"
import { useRouting } from "../../../hooks/useRouting"

const ShoppingCartItem = ({ cartObject }) => {
  const { setAmount, increaseAmount, decreaseAmount } =
    useShoppingCart()
  const { language } = useLanguage()
  const { openItem } = useRouting()

  const [itemAmount, setItemAmount] = useState(cartObject.amount)

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
      setItemAmount(e.target.value)
      setAmount(cartObject.item, number)
    }
  }

  // If the cart is closed while input is empty, set amount to 1
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setItemAmount(cartObject.amount)
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
      openItem(cartObject.item.category, cartObject.item._id)
    }
  }

  console.log(cartObject)

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
            paddingLeft: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: 2,
            gap: "5px",
          }}
        >
          <Box sx={{ alignSelf: "center", width: 100 }}>
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
              width: 110,
              backgroundColor: "blue",
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

          <Box
            id="product-controls"
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "red",
              width: 46,
              paddingRight: 1,
            }}
          >
            <IconButton
              sx={{}}
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
                justifySelf: "flex-end",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />

            {cartObject.amount < 99 ? (
              <IconButton
                sx={{}}
                onClick={() => decreaseAmount(cartObject)}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </MenuItem>
    </>
  )
}

export default ShoppingCartItem
