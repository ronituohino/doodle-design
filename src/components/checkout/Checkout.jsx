import { useState } from "react"

import { Container, Typography } from "@mui/material"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"

import Cart from "./cart/Cart"
import Delivery from "./delivery_address/Delivery"
import Payment from "./payment/Payment"
import Confirmation from "./confirmation/Confirmation"
import BillingAddress from "./billing_address/BillingAddress"

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

const Checkout = () => {
  // Stepper state variables
  const [activeStep, setActiveStep] = useState(0)

  // These states store steps as 0: true, 1: true ...
  const [completed, setCompleted] = useState({})
  const [failed, setFailed] = useState({})

  // The main checkout state
  const [checkoutState, setCheckoutState] = useState({
    billingDetails: undefined,
    deliveryDetails: undefined,
    paymentDetails: undefined,
  })

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

  // This is called when all forms are filled,
  // and the purchase button is pressed
  const purchase = () => {
    console.log("place order!")
  }

  const regularLabel = { border: 2, padding: 1, borderColor: "red" }
  const clickableLabel = { border: 2, padding: 1, cursor: "pointer" }

  const setBillingDetails = (value) => {
    setCheckoutState({ ...checkoutState, billingDetails: value })
  }

  const setDeliveryDetails = (value) => {
    setCheckoutState({ ...checkoutState, deliveryDetails: value })
  }

  const setPaymentDetails = (value) => {
    setCheckoutState({ ...checkoutState, paymentDetails: value })
  }

  const handleError = (isValid, stepIndex) => {
    if (isValid !== undefined) {
      const newFailed = { ...failed }
      newFailed[stepIndex] = !isValid
      setFailed(newFailed)
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 2,
      }}
    >
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ marginBottom: 2 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepLabel
              onClick={() => {
                if (previousStepsCompleted(index)) {
                  setActiveStep(index)
                }
              }}
              sx={
                previousStepsCompleted(index)
                  ? clickableLabel
                  : regularLabel
              }
              error={failed[index]}
            >
              <Typography variant="body2">{step.label}</Typography>
              <Typography variant="caption">
                {step.sublabel}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Cart next={handleComplete} hidden={activeStep !== 0} />

      <BillingAddress
        next={handleComplete}
        checkout={checkoutState}
        setBillingDetails={setBillingDetails}
        setError={(valid) => {
          handleError(valid, 1)
        }}
        hidden={activeStep !== 1}
      />
      <Delivery
        next={handleComplete}
        checkout={checkoutState}
        setDeliveryDetails={setDeliveryDetails}
        setError={(valid) => {
          handleError(valid, 2)
        }}
        hidden={activeStep !== 2}
      />
      <Payment
        next={handleComplete}
        checkout={checkoutState}
        setPaymentDetails={setPaymentDetails}
        setError={(valid) => {
          handleError(valid, 3)
        }}
        hidden={activeStep !== 3}
      />
      <Confirmation
        next={purchase}
        checkout={checkoutState}
        setError={(valid) => {
          handleError(valid, 4)
        }}
        hidden={activeStep !== 4}
      />
    </Container>
  )
}

export default Checkout
