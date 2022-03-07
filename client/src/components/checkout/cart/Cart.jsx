import { Box, Button, Paper, Typography } from "@mui/material"

import { useRouting } from "../../../hooks/useRouting"
import { useAccount } from "../../../hooks/useAccount"
import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartProduct from "../../top_bar/shopping_cart/ShoppingCartProduct"
import Receipt from "./receipt/Receipt"
import Coupons from "./Coupons"
import { useLanguage } from "../../../hooks/useLanguage"
import { getText } from "../../../utils/dictionary"

const Cart = ({ next, hideControls, hidden, children }) => {
  const { language } = useLanguage()
  const { openLink, loginLink } = useRouting()

  const account = useAccount()
  const loggedIn = account.loggedIn()

  const cart = useShoppingCart()
  const total = cart.totalAmountOfProducts()

  return (
    <>
      {!hidden && (
        <Box sx={{ display: "flex", gap: "17.5px" }}>
          <Paper elevation={4} sx={{ width: "60%", height: "100%" }}>
            {total === 0 && (
              <Box sx={{ p: 2, pb: 0 }}>
                <Typography
                  color="grey.700"
                  sx={{ textAlign: "center", mb: 2 }}
                >
                  {getText(language, "cartEmptyText")}
                </Typography>
              </Box>
            )}
            {total > 0 &&
              cart.data.cartProducts.map((obj) => (
                <ShoppingCartProduct
                  key={obj.product.hash}
                  cartObject={obj}
                  hideControls={hideControls}
                />
              ))}
          </Paper>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              width: "40%",
              height: "100%",
            }}
          >
            <Receipt />
            {!hideControls && (
              <>
                <Coupons />
                {loggedIn ? (
                  <Button
                    disabled={total <= 0}
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={next}
                  >
                    {getText(language, "next")}
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={() => openLink(loginLink())}
                  >
                    {getText(language, "login")}
                  </Button>
                )}
              </>
            )}

            {children}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Cart
