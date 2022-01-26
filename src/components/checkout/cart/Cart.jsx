import { Box, Button, Paper } from "@mui/material"

import { useRouting } from "../../../hooks/useRouting"
import { useAccount } from "../../../hooks/useAccount"
import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartProduct from "../../top_bar/shopping_cart/ShoppingCartProduct"
import Receipt from "./receipt/Receipt"
import Coupons from "./Coupons"

const Cart = ({ next, hideControls, hidden, children }) => {
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
            {total === 0 && <p>empty!</p>}
            {total > 0 &&
              cart.data.cartProducts.map((obj) => (
                <ShoppingCartProduct
                  key={obj.product.hash}
                  cartObject={obj}
                  hideControls={hideControls}
                  ref={null}
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
                    variant="contained"
                    onClick={next}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => openLink(loginLink())}
                  >
                    Login
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
