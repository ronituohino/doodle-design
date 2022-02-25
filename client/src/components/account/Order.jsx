import {
  Box,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"

const Order = ({ order }) => {
  console.log(order)

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
          {`${order.datetime.day}/${order.datetime.month}/${order.datetime.year}`}
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  )
}

export default Order
