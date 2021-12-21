import { Container, Stepper, Step, StepLabel } from "@mui/material"
import { useState } from "react"

const steps = ["Check shopping cart", "Checkout", "Confirmation"]

const Checkout = () => {
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          // params (label, index) possible
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Container>
  )
}

export default Checkout
