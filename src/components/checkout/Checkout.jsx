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
  const [completed, setCompleted] = useState({})

  // The other state variables used in checkout
  // are handled by useCheckout()

  const handleComplete = () => {
    const newCompleted = completed
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
            >
              <Typography variant="body2">{step.label}</Typography>
              <Typography variant="caption">
                {step.sublabel}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && <Button>Purchase</Button>}

      {/* This is a switch statement */}
      {
        {
          0: <Cart next={handleComplete} />,
          1: <BillingAddress next={handleComplete} />,
          2: <Delivery next={handleComplete} />,
          3: <Payment next={handleComplete} />,
          4: <Confirmation next={purchase} />,
        }[activeStep]
      }
    </Container>
  )
}

export default Checkout
