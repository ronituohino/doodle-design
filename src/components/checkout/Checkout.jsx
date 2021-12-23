import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material"
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
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                optional={
                  index === 0 ? (
                    <Typography variant="caption">
                      Apply coupons / gift cards here
                    </Typography>
                  ) : null
                }
              >
                {label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Container>
  )
}

export default Checkout
