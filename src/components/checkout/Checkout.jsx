import { useState } from "react"
import { Container, Typography } from "@mui/material"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"

import Cart from "./cart/Cart"
import AddressForm from "./billing_address/AddressForm"
import Delivery from "./delivery_address/Delivery"
import Payment from "./payment/Payment"

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
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  const [billingAddress, setBillingAddress] = useState(undefined)
  const [deliveryAddress, setDeliveryAddresss] = useState(undefined)

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

  const billingAddressSubmit = (values) => {
    setBillingAddress(values)
    handleComplete()
  }

  const deliveryAddressSubmit = (values) => {
    setDeliveryAddresss(values)
    handleComplete()
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

      <Cart complete={handleComplete} hidden={activeStep !== 0} />

      <AddressForm
        submit={billingAddressSubmit}
        hidden={activeStep !== 1}
      />
      <Delivery
        submit={deliveryAddressSubmit}
        billingAddress={billingAddress}
        hidden={activeStep !== 2}
      />

      <Payment delivery={deliveryAddress} hidden={activeStep !== 3} />
    </Container>
  )
}

export default Checkout
