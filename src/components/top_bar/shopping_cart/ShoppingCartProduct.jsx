import { useState, useEffect } from "react"

import {
  IconButton,
  MenuItem,
  Box,
  TextField,
  Typography,
  Button,
  Icon,
} from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"
import { useLanguage } from "../../../hooks/useLanguage"

import { hasParentWithMatchingSelector } from "../../../utils/utils"

import { formatPrice } from "../../../utils/formatting"
import { useRouting } from "../../../hooks/useRouting"

// eslint-disable-next-line react/display-name
const ShoppingCartProduct = ({
  cartObject,
  hideControls,
  closeMenu,
}) => {
  const {
    setAmount,
    increaseAmount,
    decreaseAmount,
    removeItemFromCart,
  } = useShoppingCart()
  const { language } = useLanguage()
  const { openLink, productLink } = useRouting()

  const [productAmount, setProductAmount] = useState(
    cartObject.amount
  )
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // Updates productAmount when amount is modified outside
  useEffect(() => {
    setProductAmount(cartObject.amount)
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
      setProductAmount("")
      return
    }

    const number = filterInt(e.target.value)
    if (!isNaN(number) && number < 100) {
      if (number <= 0) {
        setDeleteConfirm(true)
        setProductAmount(cartObject.amount)
      } else {
        setProductAmount(e.target.value)
        setAmount(cartObject.product, number)
      }
    }
  }

  // If the cart is closed while input is empty, set amount to 1
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setProductAmount(cartObject.amount)
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
      openLink(
        productLink(
          cartObject.product.category,
          cartObject.product._id
        )
      )
      setDeleteConfirm(false)
      closeMenu()
    }
  }

  return (
    <MenuItem
      divider
      disableTouchRipple={true}
      onClick={(e) => checkLinkClick(e)}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        paddingRight: 2,
      }}
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
          alignSelf: "center",
          minWidth: "35%",
          flexGrow: 2,
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          {cartObject.product.name[language]}
        </Typography>

        {cartObject.product.customization &&
          cartObject.product.customization.map((c) => {
            return (
              <Box
                key={`${cartObject.product.hash}-${c.label[language]}-${c.option[language]}`}
                sx={{ marginTop: -1 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  {c.label[language]}: {c.option[language]}
                </Typography>
              </Box>
            )
          })}
      </Box>

      <Box sx={{ minWidth: "24%" }}>
        <Typography
          noWrap
          sx={{
            fontWeight: "bold",
          }}
        >
          {formatPrice(
            cartObject.product.price.EUR * cartObject.amount,
            language,
            "EUR"
          )}
        </Typography>

        <Typography
          noWrap
          variant="caption"
          sx={{
            color: "text.secondary",
          }}
        >
          {`(${formatPrice(
            cartObject.product.price.EUR,
            language,
            "EUR"
          )} x${cartObject.amount})`}
        </Typography>
      </Box>

      {!deleteConfirm && !hideControls && (
        <Box sx={{ display: "flex" }}>
          <Box
            id="product-controls"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 60,
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                alignSelf: "center",
                pb: 0.5,
              }}
            >
              <IconButton
                disabled={cartObject.amount < 99 ? false : true}
                onClick={() => {
                  increaseAmount(cartObject.product)
                }}
                sx={{
                  width: 20,
                  height: 20,
                }}
              >
                <Icon>expand_less</Icon>
              </IconButton>
            </Box>

            <TextField
              hiddenLabel
              value={productAmount}
              onChange={handleValueChange}
              onBlur={handleBlur}
              size="small"
              sx={{
                alignSelf: "center",
                width: 46,
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />

            <Box
              sx={{
                width: 20,
                height: 20,
                alignSelf: "center",
              }}
            >
              <IconButton
                disabled={cartObject.amount <= 1 ? true : false}
                sx={{
                  width: 20,
                  height: 20,
                }}
                onClick={() => decreaseAmount(cartObject)}
              >
                <Icon>expand_more</Icon>
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ alignSelf: "center" }}>
            <IconButton
              id="product-controls"
              onClick={() => setDeleteConfirm(true)}
            >
              <Icon>delete</Icon>
            </IconButton>
          </Box>
        </Box>
      )}
      {deleteConfirm && !hideControls && (
        <Box
          id="product-controls"
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 1,
            paddingLeft: 1,
            width: 60,
            height: 80,
          }}
        >
          <Button onClick={() => setDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => removeItemFromCart(cartObject.product)}
          >
            Delete
          </Button>
        </Box>
      )}
    </MenuItem>
  )
}

export default ShoppingCartProduct
