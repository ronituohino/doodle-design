import { useState } from "react"
import { Container } from "@mui/material"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"

import Cart from "./cart/Cart"
import AddressForm from "./address/AddressForm"
import Delivery from "./delivery/Delivery"

const steps = [
  {
    label: "Cart",
  },
  {
    label: "Your details",
  },
  {
    label: "Delivery",
  },
]

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

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
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepLabel onClick={() => setActiveStep(index)}>
              {step.label}
            </StepLabel>

            <StepContent>
              {/* This is a switch statement */}
              {
                {
                  0: <Cart complete={handleComplete} />,
                  1: <AddressForm submit={handleComplete} />,
                  2: <Delivery />,
                }[index]
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && <Button>Purchase</Button>}
    </Container>
  )
}

export default Checkout
