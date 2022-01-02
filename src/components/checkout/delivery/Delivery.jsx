import { useFormik } from "formik"
import * as yup from "yup"

import { Box, Button } from "@mui/material"
import FormikField from "../../general/FormikField"
import FormikRadioField from "../../general/FormikRadioField"
import { useEffect } from "react"
import FormikRadioGroup from "../../general/FormikRadioGroup"
import DeliveryMethod from "./DeliveryMethod"

const Delivery = ({ submit, delivery, sx }) => {
  const formik = useFormik({
    initialValues: {
      delivery: "",
    },
    validationSchema: yup.object({
      delivery: yup.string().required("Delivery method is required"),
    }),
    onSubmit: (values) => {
      submit(values)
    },
  })

  useEffect(() => {
    if (delivery) {
      if (Object.keys(delivery).length > 1) {
        formik.setValues(delivery)
      }
    }
  }, [delivery])

  return (
    <Box sx={{ ...sx }}>
      <form onSubmit={formik.handleSubmit}>
        <FormikRadioGroup formik={formik} field="delivery">
          <FormikRadioField
            value="home-delivery"
            content={
              <DeliveryMethod
                title="Home Delivery"
                text="Delivery straight to your door"
              />
            }
          />
          <FormikRadioField
            value="female"
            content={<DeliveryMethod />}
          />
        </FormikRadioGroup>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  )
}

export default Delivery
