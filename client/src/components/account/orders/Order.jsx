import {
  Box,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  MenuItem,
  Divider,
} from "@mui/material"
import { useRouting } from "../../../hooks/useRouting"

import {
  formatMonth,
  formatPrice,
  formatTime,
} from "../../../utils/formatting"

import LabelPaper from "../../general/LabelPaper"
import AddressDisplay from "../../general/AddressDisplay"

import { getFile } from "../../../utils/getFile"

const Order = ({ order, language }) => {
  const { openLink, productLink } = useRouting()
  const totalPrice = () => {
    let total = 0
    order.products.forEach((orderProduct) => {
      total += orderProduct.price.EUR * orderProduct.amount
    })

    return total
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {`${order.datetime.day}. ${formatMonth(
            order.datetime.month,
            language
          )} ${order.datetime.year} - ${formatTime(
            order.datetime.hours,
            order.datetime.minutes
          )}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Divider />
          <List>
            {order.products.map((productObject) => (
              <MenuItem
                key={productObject.product._id}
                onClick={() =>
                  openLink(
                    productLink(
                      productObject.product.category.name,
                      productObject.product._id
                    )
                  )
                }
              >
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
                <Box
                  sx={{
                    alignSelf: "center",
                    ml: 1,
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
                    {productObject.product.name[language]}
                  </Typography>

                  {productObject.customization &&
                    productObject.customization.map((c) => {
                      return (
                        <Box
                          key={`${productObject.product.hash}-${c.label[language]}-${c.option[language]}`}
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

                <Box sx={{ ml: 8 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {formatPrice(
                      productObject.product.price.EUR *
                        productObject.amount,
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
                      productObject.product.price.EUR,
                      language,
                      "EUR"
                    )} x${productObject.amount})`}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </List>
          <Divider />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            gap: "10px",
          }}
        >
          <LabelPaper variant="outlined" label="Total">
            <Typography
              noWrap
              sx={{
                fontWeight: "bold",
              }}
            >
              {formatPrice(totalPrice(), language, "EUR")}
            </Typography>
          </LabelPaper>
          <AddressDisplay
            label="Billing address"
            variant="outlined"
            address={order.billingAddress}
            disableEdit
          />
          <AddressDisplay
            label="Delivery address"
            variant="outlined"
            address={order.deliveryAddress}
            disableEdit
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Order
