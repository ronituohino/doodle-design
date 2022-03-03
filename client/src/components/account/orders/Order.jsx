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
  Chip,
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

import { orderConstants } from "../../../utils/constants"
import { getText } from "../../../utils/dictionary"

const Order = ({ order, language }) => {
  const { openLink, productLink } = useRouting()
  const totalPrice = () => {
    let total = 0
    order.products.forEach((orderProduct) => {
      total += orderProduct.price.EUR * orderProduct.amount
    })
    return total
  }

  let paymentMethodText = ""
  switch (order.paymentDetails.details.method) {
    case orderConstants.PREPAYMENT:
      paymentMethodText = "Prepayment"
      break
    case orderConstants.INSTALLMENT:
      paymentMethodText = "Installment"
      break
    case orderConstants.LOCAL_PAYMENT:
      paymentMethodText = "Pay at the store"
      break
    default:
      break
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {`${order.datetime.day}. ${formatMonth(
              order.datetime.month,
              language
            )} ${order.datetime.year} - ${formatTime(
              order.datetime.hours,
              order.datetime.minutes
            )} UTC`}
          </Typography>
          <Chip
            sx={{ alignSelf: "center" }}
            label={getText(language, order.status.toLowerCase())}
          />
        </Box>
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
          <LabelPaper
            variant="outlined"
            label={getText(language, "total")}
          >
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
            label={getText(language, "billingAddress")}
            variant="outlined"
            address={order.billingAddress}
            disableEdit
          />
          <AddressDisplay
            label={
              order.deliveryAddress.method ===
              orderConstants.STORE_PICKUP
                ? getText(language, "pickUpFrom")
                : getText(language, "deliveryAddress")
            }
            variant="outlined"
            address={order.deliveryAddress}
            disableEdit
          />
          <LabelPaper
            label={getText(language, "paymentDetails")}
            variant="outlined"
            sx={{ width: "100%" }}
          >
            <Typography>{`${getText(
              language,
              "method"
            )}: ${paymentMethodText}`}</Typography>
            {order.paymentDetails.details.method !==
              orderConstants.LOCAL_PAYMENT && (
              <Typography>
                {`${getText(language, "provider")}: ${
                  order.paymentDetails.details.provider
                }`}
              </Typography>
            )}
          </LabelPaper>
          {order.extrainfo && (
            <LabelPaper
              variant="outlined"
              label={getText(language, "extraInformation")}
            >
              <Typography>{order.extrainfo}</Typography>
            </LabelPaper>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Order
