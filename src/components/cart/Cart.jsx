import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
} from "@mui/material"
import { useState } from "react"

import { useShoppingCart } from "../../hooks/useShoppingCart"

import ShoppingCartItem from "../top_bar/shopping_cart/ShoppingCartItem"
import ContentCard from "../content/ContentCard"
import Receipt from "./Receipt"
import Coupons from "./Coupons"

const steps = ["Check shopping cart", "Checkout", "Confirmation"]

const Cart = () => {
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0)

  const { data, totalAmountOfItems } = useShoppingCart()
  const total = totalAmountOfItems()

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
      }}
    >
      <ContentCard
        disableHover
        size={{ width: "100%", height: "100%" }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel
                  optional={
                    index === 0 ? (
                      <Typography variant="caption">
                        Apply coupons / gift cards here
                      </Typography>
                    ) : null
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </ContentCard>

      <Box sx={{ marginTop: "30px", display: "flex", gap: "30px" }}>
        <ContentCard
          disableHover
          size={{ width: "60%", height: "100%" }}
        >
          {total === 0 && <p>empty!</p>}
          {total > 0 &&
            data.cartItems.map((obj) => (
              <ShoppingCartItem
                key={obj.item.hash}
                cartObject={obj}
                ref={null}
              />
            ))}
        </ContentCard>

        <Box sx={{ width: "40%", height: "100%" }}>
          <Receipt />
          <Box sx={{ height: 30 }} />
          <Coupons />
          <Box sx={{ height: 30 }} />
          <Button variant="contained" sx={{ width: "100%" }}>
            Proceed
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Cart
