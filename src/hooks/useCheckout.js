import { useQuery } from "@apollo/client"
import { checkoutVar } from "../cache"
import { CHECKOUT } from "../graphql/queries"

export const useCheckout = () => {
  const { data } = useQuery(CHECKOUT)

  const setBillingDetails = (billingDetails) => {
    checkoutVar({ ...checkoutVar(), billingDetails })
  }

  const setDeliveryDetails = (deliveryDetails) => {
    checkoutVar({ ...checkoutVar(), deliveryDetails })
  }

  const setPaymentDetails = (paymentDetails) => {
    checkoutVar({ ...checkoutVar(), paymentDetails })
  }

  console.log(data)

  return {
    data,
    setBillingDetails,
    setDeliveryDetails,
    setPaymentDetails,
  }
}
