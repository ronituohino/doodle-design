import { cartItemsVar } from "../cache"

export const addToCart = (item) => {
  cartItemsVar([...cartItemsVar(), item])
  console.log(cartItemsVar())
}
