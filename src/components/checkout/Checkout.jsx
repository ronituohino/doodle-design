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
import { useMutation } from "@apollo/client"
import { CREATE_ORDER } from "../../graphql/mutations"
import { useRouting } from "../../hooks/useRouting"
import { useShoppingCart } from "../../hooks/useShoppingCart"

const steps = [
  {
    label: "Cart",
  },
  {
    label: "Billing Address",
    sublabel: "(Your details)",
  },
  {
    label: "Delivery Address",
  },
  {
    label: "Payment Details",
  },
  {
    label: "Confirmation",
  },
]

const constants = {
  HOME_DELIVERY: "home-delivery",
  POSTI_PARCEL: "posti-parcel",
  STORE_PICKUP: "store-pickup",

  PREPAYMENT: "prepayment",
  INSTALLMENT: "installment",
  LOCAL_PAYMENT: "local-payment",
}

const Checkout = () => {
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
  } = useCheckoutForms(constants)

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
  const { data } = useShoppingCart()

  console.log(data)

  const [createOrderMutation] = useMutation(CREATE_ORDER, {
    onCompleted: (response) => {
      console.log(response)

      // Replace with success screen
      openLink(homeLink())
    },
  })

  // This is called when all forms are filled,
  // and the purchase button is pressed
  const purchase = () => {
    //createOrderMutation({ variables: {
    //  items:
    //}})
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
        constants={constants}
        next={handleComplete}
        checkout={checkout}
        hidden={activeStep !== 2}
      />
      <Payment
        formik={paymentFormik}
        constants={constants}
        next={handleComplete}
        checkout={checkout}
        hidden={activeStep !== 3}
      />
      <Confirmation
        formik={confirmationFormik}
        allValid={allValid}
        constants={constants}
        next={purchase}
        checkout={checkout}
        hidden={activeStep !== 4}
      />
    </>
  )
}

export default Checkout
