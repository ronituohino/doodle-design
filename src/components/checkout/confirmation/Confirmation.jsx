import { Paper, Button, Typography } from "@mui/material"
import { useCheckout } from "../../../hooks/useCheckout"

import Cart from "../cart/Cart"
import AddressDisplay from "../delivery_address/AddressDisplay"

const Confirmation = ({ purchase }) => {
  const { data } = useCheckout()

  return (
    <Cart hideControls>
      <Paper>
        <AddressDisplay
          address={data.checkout.billingDetails}
          disableEdit
        />
      </Paper>

      <Paper>
        <AddressDisplay
          address={data.checkout.deliveryDetails}
          disableEdit
        />
      </Paper>

      <Paper>
        <Typography>pay</Typography>
      </Paper>
      <Button fullWidth variant="contained" onClick={purchase}>
        Purchase
      </Button>
    </Cart>
  )
}

export default Confirmation
