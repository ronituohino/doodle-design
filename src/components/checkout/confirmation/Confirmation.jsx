import { Paper, Button, Typography } from "@mui/material"

import Cart from "../cart/Cart"
import AddressDisplay from "../delivery_address/AddressDisplay"

const Confirmation = ({
  purchase,
  billingAddress,
  deliveryAddress,
  paymentDetails,
  hidden,
}) => {
  console.log(paymentDetails)
  return (
    <>
      {!hidden && (
        <Cart hideControls>
          <Paper>
            <AddressDisplay address={billingAddress} disableEdit />
          </Paper>

          <Paper>
            <AddressDisplay address={deliveryAddress} disableEdit />
          </Paper>

          <Paper>
            <Typography>pay</Typography>
          </Paper>
          <Button fullWidth variant="contained" onClick={purchase}>
            Purchase
          </Button>
        </Cart>
      )}
    </>
  )
}

export default Confirmation
