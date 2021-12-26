import { Typography, Box } from "@mui/material"
import ContentCard from "../content/ContentCard"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { formatPrice } from "../../utils/price"
import { useLanguage } from "../../hooks/useLanguage"

const Receipt = () => {
  const { language } = useLanguage()
  const { data, totalPriceOfItems } = useShoppingCart()

  const totalPrice = totalPriceOfItems()

  return (
    <ContentCard disableHover size={{ width: "40%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
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
        />
        <ReceiptLine
          leftText={"Coupons"}
          variant="body1"
          indent={8}
        />
      </Box>
    </ContentCard>
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
    <>
      <Box sx={{ width: "60%" }}>
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
      </Box>
      <Box
        sx={{ display: "flex", width: "40%", alignSelf: "center" }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant={variant}
          sx={{ ...sx, textIndent: indent }}
        >
          {rightText}
        </Typography>
      </Box>
    </>
  )
}

export default Receipt
