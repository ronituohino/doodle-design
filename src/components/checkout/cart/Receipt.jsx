import { Typography, List, ListItem, Paper } from "@mui/material"
import { useShoppingCart } from "../../../hooks/useShoppingCart"
import { formatPrice } from "../../../utils/price"
import { useLanguage } from "../../../hooks/useLanguage"

const Receipt = () => {
  const { language } = useLanguage()
  const { data, totalPriceOfItems } = useShoppingCart()

  const totalPrice = totalPriceOfItems()

  return (
    <Paper sx={{ width: "100%" }} variant="outlined">
      <List sx={{ padding: 1, paddingRight: 0 }}>
        <ReceiptLine
          leftText="Total"
          rightText={formatPrice(totalPrice, language, "EUR")}
          variant="h5"
          indent={0}
          sx={{
            fontWeight: "bold",
          }}
        />

        <ReceiptLine
          leftText={"Items"}
          rightText={formatPrice(totalPrice, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
        {data.cartItems.map((cartObject) => {
          return (
            <ItemListing
              key={cartObject.item.hash}
              cartObject={cartObject}
              language={language}
            />
          )
        })}

        <ReceiptLine
          leftText={"Shipping"}
          rightText={formatPrice(0, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
        <ReceiptLine
          leftText={"Coupons"}
          rightText={formatPrice(0, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
      </List>
    </Paper>
  )
}

const ItemListing = ({ cartObject, language }) => {
  return (
    <>
      <ReceiptLine
        leftText={cartObject.item.name}
        variant="caption"
        indent={16}
        sx={{
          fontWeight: "bold",
          color: "grey",
        }}
      />

      {cartObject.item.customization.map((c) => {
        return (
          <ReceiptLine
            key={`${cartObject.item.hash}-${c.label}-${c.option}`}
            leftText={`${c.label}: ${c.option}`}
            variant="caption"
            indent={24}
            sx={{
              color: "grey",
            }}
          />
        )
      })}

      <ReceiptLine
        leftText={`(${formatPrice(
          cartObject.item.price,
          language,
          "EUR"
        )} x${cartObject.amount})`}
        rightText={formatPrice(
          cartObject.item.price * cartObject.amount,
          language,
          "EUR"
        )}
        variant="caption"
        indent={24}
        sx={{
          color: "grey",
        }}
      />
    </>
  )
}

const ReceiptLine = ({
  leftText,
  rightText,
  variant,
  indent,
  sx,
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Typography variant={variant} sx={{ ...sx }}>
          {rightText}
        </Typography>
      }
    >
      <Typography
        variant={variant}
        sx={{
          ...sx,
          textIndent: indent,
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {leftText}
      </Typography>
    </ListItem>
  )
}

export default Receipt
