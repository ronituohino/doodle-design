import { List, Paper } from "@mui/material";
import { useShoppingCart } from "../../../../hooks/useShoppingCart";
import { formatPrice } from "../../../../utils/formatting";
import { useLanguage } from "../../../../hooks/useLanguage";

import ProductListing from "./ProductListing";
import ReceiptLine from "./ReceiptLine";
import { getText } from "../../../../utils/dictionary";

const Receipt = () => {
  const { language } = useLanguage();
  const { data, totalPriceOfProducts } = useShoppingCart();

  const totalPrice = totalPriceOfProducts();

  return (
    <Paper elevation={4} sx={{ width: "100%" }}>
      <List sx={{ padding: 1, paddingRight: 0 }}>
        <ReceiptLine
          leftText={getText(language, "total")}
          rightText={formatPrice(totalPrice, language, "EUR")}
          variant="h5"
          indent={0}
          sx={{
            fontWeight: "bold",
          }}
        />

        <ReceiptLine
          leftText={getText(language, "products")}
          rightText={formatPrice(totalPrice, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
        {data.cartProducts.map(cartObject => {
          return (
            <ProductListing
              key={cartObject.product.hash}
              cartObject={cartObject}
              language={language}
            />
          );
        })}

        <ReceiptLine
          leftText={getText(language, "shipping")}
          rightText={formatPrice(0, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
        <ReceiptLine
          leftText={getText(language, "coupons")}
          rightText={formatPrice(0, language, "EUR")}
          variant="body1"
          indent={8}
          sx={{
            fontWeight: "bold",
          }}
        />
      </List>
    </Paper>
  );
};

export default Receipt;
