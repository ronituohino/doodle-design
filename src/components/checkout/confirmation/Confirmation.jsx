import { Paper, Button, Typography } from "@mui/material"

import Cart from "../cart/Cart"
import AddressDisplay from "../delivery_address/AddressDisplay"

const Confirmation = ({ next, checkout, hidden }) => {
  return (
    <>
      {!hidden && (
        <Cart hideControls>
          <Paper>
            {checkout.billingDetails && (
              <AddressDisplay
                address={checkout.billingDetails}
                disableEdit
              />
            )}
          </Paper>

          <Paper>
            {checkout.deliveryDetails && (
              <AddressDisplay
                address={checkout.deliveryDetails}
                disableEdit
              />
            )}
          </Paper>

          <Paper>
            <Typography>pay</Typography>
          </Paper>
          <Button fullWidth variant="contained" onClick={next}>
            Purchase
          </Button>
        </Cart>
      )}
    </>
  )
}

export default Confirmation
