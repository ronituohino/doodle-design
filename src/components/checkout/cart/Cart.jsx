import { Box, Button, Paper } from "@mui/material"

import { useShoppingCart } from "../../../hooks/useShoppingCart"

import ShoppingCartItem from "../../top_bar/shopping_cart/ShoppingCartItem"
import Receipt from "./Receipt"
import Coupons from "./Coupons"

const Cart = ({ next, hideControls, children }) => {
  const { data, totalAmountOfItems } = useShoppingCart()
  const total = totalAmountOfItems()

  return (
    <Box sx={{ display: "flex", gap: "30px" }}>
      <Paper sx={{ width: "60%", height: "100%" }} variant="outlined">
        {total === 0 && <p>empty!</p>}
        {total > 0 &&
          data.cartItems.map((obj) => (
            <ShoppingCartItem
              key={obj.item.hash}
              cartObject={obj}
              hideControls
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
            <Button
              disabled={total <= 0}
              fullWidth
              variant="contained"
              onClick={next}
            >
              Next
            </Button>
          </>
        )}

        {children}
      </Box>
    </Box>
  )
}

export default Cart
