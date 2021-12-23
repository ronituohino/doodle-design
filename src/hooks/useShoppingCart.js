import { useEffect, useState } from "react"

import { cartItemsVar } from "../cache"
import { useLanguage } from "./useLanguage"

// Hook to handle cached shoppingCart

// When the shopping cart is centralized in the cache, all
// components that use this hook get updated when the shopping cart
// is updated somewhere

// The shopping cart is accessed using the query SHOPPING_CART, see graphql/queries.js
export const useShoppingCart = () => {
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

  const match = (item) => {
    return cartItemsVar().findIndex((c) => {
      return c.item._id === item._id && c.item.hash === item.hash
    })
  }

  const addItemToCart = (item) => {
    const matchIndex = match(item)

    if (matchIndex === -1) {
      cartItemsVar([...cartItemsVar(), { item, amount: 1 }])
    } else {
      increaseAmount(item, matchIndex)
    }
  }

  const removeItemFromCart = (item, matchIndex = -1) => {
    if (matchIndex === -1) {
      matchIndex = match(item)
    }

    let newArr = cartItemsVar()
    newArr.splice(matchIndex, 1)

    // Reference needs to changed for Apollo to call updates
    cartItemsVar([...newArr])
  }

  const setAmount = (item, amount, matchIndex = -1) => {
    if (amount === 0) {
      removeItemFromCart(item)
      return
    }

    if (matchIndex === -1) {
      matchIndex = match(item)
    }

    let newArr = cartItemsVar()
    newArr[matchIndex] = { item, amount }

    // Reference needs to changed for Apollo to call updates
    cartItemsVar([...newArr])
  }

  const increaseAmount = (item, matchIndex = -1) => {
    if (matchIndex === -1) {
      matchIndex = match(item)
    }

    let newArr = cartItemsVar()
    const prevItem = newArr[matchIndex]

    newArr[matchIndex] = { item: item, amount: prevItem.amount + 1 }

    // Reference needs to changed for Apollo to call updates
    cartItemsVar([...newArr])
  }

  const decreaseAmount = (cartObject, matchIndex = -1) => {
    if (cartObject.amount === 1) {
      removeItemFromCart(cartObject.item)
      return
    }

    if (matchIndex === -1) {
      matchIndex = match(cartObject.item)
    }

    let newArr = cartItemsVar()
    const prevItem = newArr[matchIndex]

    newArr[matchIndex] = {
      item: cartObject.item,
      amount: prevItem.amount - 1,
    }

    // Reference needs to changed for Apollo to call updates
    cartItemsVar([...newArr])
  }

  const totalAmountOfItems = () => {
    const items = cartItemsVar()
    if (items) {
      let sum = 0
      items.forEach((e) => (sum += e.amount))
      return sum
    } else {
      return 0
    }
  }

  return {
    addItemToCart,
    removeItemFromCart,
    setAmount,
    increaseAmount,
    decreaseAmount,
    totalAmountOfItems,
  }
}
