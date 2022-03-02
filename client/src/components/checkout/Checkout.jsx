import { useState, useEffect } from "react"

import { Typography, Paper } from "@mui/material"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"

import Cart from "./cart/Cart"
import Delivery from "./delivery_address/Delivery"
import Payment from "./payment/Payment"
import Confirmation from "./confirmation/Confirmation"
import BillingAddress from "./billing_address/BillingAddress"
import { useCheckoutForms } from "./useCheckoutForms"
import { useApolloClient, useMutation } from "@apollo/client"
import { CREATE_ORDER } from "../../graphql/mutations"
import { useRouting } from "../../hooks/useRouting"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import { useSnackbar } from "notistack"

import { orderConstants } from "../../utils/constants"
import { GET_ORDERS } from "../../graphql/queries"
import { useLanguage } from "../../hooks/useLanguage"
import { getText } from "../../utils/dictionary"

const Checkout = () => {
  const { language } = useLanguage()
  const steps = [
    {
      label: getText(language, "cart"),
    },
    {
      label: getText(language, "billingAddress"),
      sublabel: `(${getText(language, "yourDetails")})`,
    },
    {
      label: getText(language, "deliveryAddress"),
    },
    {
      label: getText(language, "paymentDetails"),
    },
    {
      label: getText(language, "confirmation"),
    },
  ]
  const client = useApolloClient()
  const { enqueueSnackbar } = useSnackbar()

  // Stepper state variables
  const [activeStep, setActiveStep] = useState(0)

  // These states store steps as 0: true, 1: true ...
  const [completed, setCompleted] = useState({})
  const [failed, setFailed] = useState({})

  const {
    billingFormik,
    deliveryFormik,
    paymentFormik,
    confirmationFormik,
  } = useCheckoutForms(orderConstants)

  const allValid =
    billingFormik.isValid &&
    deliveryFormik.isValid &&
    paymentFormik.isValid &&
    confirmationFormik.isValid

  // Used to set checkout errors
  useEffect(() => {
    handleErrors(
      billingFormik.isValid,
      deliveryFormik.isValid,
      paymentFormik.isValid,
      confirmationFormik.isValid
    )
    // eslint-disable-next-line
  }, [
    billingFormik.isValid,
    deliveryFormik.isValid,
    paymentFormik.isValid,
    confirmationFormik.isValid,
  ])

  const checkout = {
    billingDetails: billingFormik.values,
    deliveryDetails: deliveryFormik.values,
    paymentDetails: paymentFormik.values,
    confirmationDetails: confirmationFormik.values,
  }

  const handleComplete = () => {
    const newCompleted = { ...completed }
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const previousStepsCompleted = (index) => {
    return completedSteps() >= index
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const { openLink, homeLink } = useRouting()
  const { data, emptyCart } = useShoppingCart()

  const [createOrderMutation] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      enqueueSnackbar(getText(language, "orderReceived"), {
        variant: "success",
      })

      emptyCart()

      // Refetch GET_ORDERS query
      client.refetchQueries({
        include: [GET_ORDERS],
      })

      // Replace with success screen?
      openLink(homeLink())
    },
  })

  // This is called when all forms are filled,
  // and the purchase button is pressed
  const purchase = () => {
    const products = []

    data.cartProducts.forEach((cartObject) => {
      const product = {}

      product.product = cartObject.product._id
      product.price = cartObject.product.price
      product.customization = cartObject.product.customization
      product.amount = cartObject.amount

      products.push(product)
    })

    const billingAddress = checkout.billingDetails
    let deliveryAddress = {}

    switch (checkout.deliveryDetails.deliveryMethod) {
      case orderConstants.HOME_DELIVERY:
        if (checkout.deliveryDetails.useExplicitDeliveryAddress) {
          deliveryAddress = {
            method: orderConstants.HOME_DELIVERY,
            ...checkout.deliveryDetails.homeDeliveryAddress,
          }
        } else {
          deliveryAddress = {
            method: orderConstants.HOME_DELIVERY,
            ...billingAddress,
          }
        }
        break
      case orderConstants.POSTI_PARCEL:
        deliveryAddress = {
          method: orderConstants.POSTI_PARCEL,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          ...checkout.deliveryDetails.postiParcelAddress,
        }
        break
      case orderConstants.STORE_PICKUP:
        deliveryAddress = {
          method: orderConstants.STORE_PICKUP,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          ...checkout.deliveryDetails.storePickupAddress,
        }
        break
      default:
        break
    }
    deliveryAddress.phone = checkout.deliveryDetails.phone

    const paymentDetails = { coupons: [] }

    switch (checkout.paymentDetails.paymentMethod) {
      case orderConstants.PREPAYMENT:
        paymentDetails.details = {
          method: orderConstants.PREPAYMENT,
          provider: checkout.paymentDetails.prePayment,
        }
        break
      case orderConstants.INSTALLMENT:
        paymentDetails.details = {
          method: orderConstants.INSTALLMENT,
          provider: checkout.paymentDetails.installment,
        }
        break
      case orderConstants.LOCAL_PAYMENT:
        paymentDetails.details = {
          method: orderConstants.LOCAL_PAYMENT,
          provider: "",
        }
        break
      default:
        break
    }

    createOrderMutation({
      variables: {
        products,
        billingAddress,
        deliveryAddress,
        paymentDetails,
        extrainfo: checkout.confirmationDetails.extrainfo,
      },
    })
  }

  const regularLabel = { padding: 1 }
  const clickableLabel = { padding: 1, cursor: "pointer" }

  const handleErrors = (
    billingValid,
    deliveryValid,
    paymentValid
  ) => {
    const newFailed = { ...failed }

    if (billingValid !== undefined) {
      newFailed[1] = !billingValid
    }
    if (deliveryValid !== undefined) {
      newFailed[2] = !deliveryValid
    }
    if (paymentValid !== undefined) {
      newFailed[3] = !paymentValid
    }

    setFailed(newFailed)
  }

  return (
    <>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ marginBottom: 4 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <Paper
              onClick={() => {
                if (previousStepsCompleted(index)) {
                  setActiveStep(index)
                }
              }}
              elevation={previousStepsCompleted(index) ? 4 : 0}
              sx={
                previousStepsCompleted(index)
                  ? clickableLabel
                  : regularLabel
              }
            >
              <StepLabel error={failed[index]}>
                <Typography variant="body2">{step.label}</Typography>
                <Typography variant="caption">
                  {step.sublabel}
                </Typography>
              </StepLabel>
            </Paper>
          </Step>
        ))}
      </Stepper>

      <Cart next={handleComplete} hidden={activeStep !== 0} />

      <BillingAddress
        formik={billingFormik}
        next={handleComplete}
        checkout={checkout}
        hidden={activeStep !== 1}
      />
      <Delivery
        formik={deliveryFormik}
        constants={orderConstants}
        next={handleComplete}
        checkout={checkout}
        hidden={activeStep !== 2}
      />
      <Payment
        formik={paymentFormik}
        constants={orderConstants}
        next={handleComplete}
        checkout={checkout}
        hidden={activeStep !== 3}
      />
      <Confirmation
        formik={confirmationFormik}
        allValid={allValid}
        constants={orderConstants}
        next={purchase}
        checkout={checkout}
        hidden={activeStep !== 4}
      />
    </>
  )
}

export default Checkout
