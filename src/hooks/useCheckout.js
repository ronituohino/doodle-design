import { useQuery } from "@apollo/client"
import { checkoutVar } from "../cache"
import { CHECKOUT } from "../graphql/queries"

export const useCheckout = () => {
  const { data } = useQuery(CHECKOUT)

  console.log(data)
  const setBillingDetails = (billingDetails) => {
    console.log("updated!")
    checkoutVar({ ...checkoutVar(), billingDetails })
    console.log(data)
  }

  const setDeliveryDetails = (deliveryDetails) => {
    checkoutVar({ ...checkoutVar(), deliveryDetails })
  }

  const setPaymentDetails = (paymentDetails) => {
    checkoutVar({ ...checkoutVar(), paymentDetails })
  }

  return {
    data,
    setBillingDetails,
    setDeliveryDetails,
    setPaymentDetails,
  }
}
