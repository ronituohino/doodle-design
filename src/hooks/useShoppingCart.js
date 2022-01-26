import { useEffect, useState } from "react"

import { useQuery } from "@apollo/client"
import { SHOPPING_CART } from "../graphql/queries"

import { cartProductsVar } from "../cache"
import { useLanguage } from "./useLanguage"

// Hook to handle cached shoppingCart

// When the shopping cart is centralized in the cache, all
// components that use this hook get updated when the shopping cart
// is updated somewhere
export const useShoppingCart = () => {
  const { data } = useQuery(SHOPPING_CART)
  const { language } = useLanguage()
  const [previousLang, setPreviousLang] = useState(language)

  useEffect(() => {
    // Check if language actually changed,
    // prevents reloading if component just changed
    if (language !== previousLang) {
      setPreviousLang(language)

      // to do ...
    }
  }, [language])

  const match = (product) => {
    return cartProductsVar().findIndex((c) => {
      return (
        c.product._id === product._id &&
        c.product.hash === product.hash
      )
    })
  }

  const addItemToCart = (product) => {
    const matchIndex = match(product)

    if (matchIndex === -1) {
      cartProductsVar([...cartProductsVar(), { product, amount: 1 }])
    } else {
      increaseAmount(product, matchIndex)
    }
  }

  const removeItemFromCart = (product, matchIndex = -1) => {
    if (matchIndex === -1) {
      matchIndex = match(product)
    }

    let newArr = cartProductsVar()
    newArr.splice(matchIndex, 1)

    // Reference needs to changed for Apollo to call updates
    cartProductsVar([...newArr])
  }

  const setAmount = (product, amount, matchIndex = -1) => {
    if (amount === 0) {
      removeItemFromCart(product)
      return
    }

    if (matchIndex === -1) {
      matchIndex = match(product)
    }

    let newArr = cartProductsVar()
    newArr[matchIndex] = { product, amount }

    // Reference needs to changed for Apollo to call updates
    cartProductsVar([...newArr])
  }

  const increaseAmount = (product, matchIndex = -1) => {
    if (matchIndex === -1) {
      matchIndex = match(product)
    }

    let newArr = cartProductsVar()
    const prevItem = newArr[matchIndex]

    newArr[matchIndex] = {
      product: product,
      amount: prevItem.amount + 1,
    }

    // Reference needs to changed for Apollo to call updates
    cartProductsVar([...newArr])
  }

  const decreaseAmount = (cartObject, matchIndex = -1) => {
    if (cartObject.amount === 1) {
      removeItemFromCart(cartObject.product)
      return
    }

    if (matchIndex === -1) {
      matchIndex = match(cartObject.product)
    }

    let newArr = cartProductsVar()
    const prevItem = newArr[matchIndex]

    newArr[matchIndex] = {
      product: cartObject.product,
      amount: prevItem.amount - 1,
    }

    // Reference needs to changed for Apollo to call updates
    cartProductsVar([...newArr])
  }

  const emptyCart = () => {
    cartProductsVar([])
  }

  const totalAmountOfProducts = () => {
    const products = cartProductsVar()
    if (products) {
      let sum = 0
      products.forEach((e) => (sum += e.amount))
      return sum
    } else {
      return 0
    }
  }

  const totalPriceOfProducts = () => {
    let sum = 0
    data.cartProducts.forEach(
      (e) => (sum += e.amount * e.product.price.EUR)
    )
    return sum
  }

  return {
    data,
    addItemToCart,
    removeItemFromCart,
    setAmount,
    increaseAmount,
    decreaseAmount,
    emptyCart,
    totalAmountOfProducts,
    totalPriceOfProducts,
  }
}
