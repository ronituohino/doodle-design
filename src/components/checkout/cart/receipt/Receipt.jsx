import { List, Paper } from "@mui/material"
import { useShoppingCart } from "../../../../hooks/useShoppingCart"
import { formatPrice } from "../../../../utils/formatting"
import { useLanguage } from "../../../../hooks/useLanguage"

import ProductListing from "./ProductListing"
import ReceiptLine from "./ReceiptLine"

const Receipt = () => {
  const { language } = useLanguage()
  const { data, totalPriceOfProducts } = useShoppingCart()

  const totalPrice = totalPriceOfProducts()

  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
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
          leftText={"Products"}
          rightText={formatPrice(totalPrice, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
        {data.cartProducts.map((cartObject) => {
          return (
            <ProductListing
              key={cartObject.product.hash}
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

export default Receipt
