import {
  Box,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"

import { formatMonth, formatPrice } from "../../utils/formatting"
import { getFile } from "../../utils/getFile"

const Order = ({ order, language }) => {
  console.log(order)
  const totalPrice = () => {
    let total = 0
    order.products.forEach((orderProduct) => {
      total += orderProduct.price.EUR * orderProduct.amount
    })

    return total
  }

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>
            {`${order.datetime.day}. ${formatMonth(
              order.datetime.month,
              language
            )} ${order.datetime.year}`}
          </Typography>
          <Typography sx={{ ml: 8 }}>
            {formatPrice(totalPrice(), language, "EUR")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {order.products.map((productObject) => (
              <ListItem key={productObject.product._id}>
                <img
                  component="img"
                  src={getFile(
                    productObject.product.images[0]._id,
                    productObject.product.images[0].filename
                  )}
                  alt={productObject.product.name[language]}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: 8,
                  }}
                />
                <ListItemText>lol</ListItemText>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Order
