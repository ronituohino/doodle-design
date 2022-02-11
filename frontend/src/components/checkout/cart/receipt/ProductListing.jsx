import ReceiptLine from "./ReceiptLine"

import { formatPrice } from "../../../../utils/formatting"

const ProductListing = ({ cartObject, language }) => {
  return (
    <>
      <ReceiptLine
        leftText={cartObject.product.name[language]}
        variant="caption"
        indent={16}
        sx={{
          fontWeight: "bold",
          color: "text.secondary",
        }}
      />

      {cartObject.product.customization.map((c) => {
        return (
          <ReceiptLine
            key={`${cartObject.product.hash}-${c.label[language]}-${c.option[language]}`}
            leftText={`${c.label[language]}: ${c.option[language]}`}
            variant="caption"
            indent={24}
            sx={{
              color: "text.secondary",
            }}
          />
        )
      })}

      <ReceiptLine
        leftText={`(${formatPrice(
          cartObject.product.price.EUR,
          language,
          "EUR"
        )} x${cartObject.amount})`}
        rightText={formatPrice(
          cartObject.product.price.EUR * cartObject.amount,
          language,
          "EUR"
        )}
        variant="caption"
        indent={24}
        sx={{
          color: "text.secondary",
        }}
      />
    </>
  )
}

export default ProductListing
