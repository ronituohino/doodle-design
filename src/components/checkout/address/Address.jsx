import { useState } from "react"

import {
  Container,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material"

import { useFormik } from "formik"
import * as yup from "yup"

import FormikField from "../../general/FormikField"

import ContentCard from "../../content/ContentCard"
import AddressForm from "./AddressForm"
import AddressDisplay from "./AddressDisplay"

import { getPostalPoints } from "../../../axios/requests"
import PostAddress from "./PostAddress"

const Address = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")

  const [editDeliveryAddress, setEditDeliveryAddress] = useState(true)
  const [deliveryAddress, setDeliveryAddress] = useState(undefined)

  const [editBillingAddress, setEditBillingAddress] = useState(true)
  const [billingAddress, setBillingAddress] = useState(undefined)

  const [useDeliveryAsBilling, setUseDeliveryAsBilling] =
    useState(true)

  const [deliveryPoints, setDeliveryPoints] = useState(undefined)

  console.log(deliveryPoints)
  const fetchDeliveryPoints = async (values) => {
    const response = await getPostalPoints(values.zipCode, 5)
    setDeliveryPoints(response)
  }

  const requireExplicitBillingAddress =
    deliveryMethod === "pickup" || !useDeliveryAsBilling

  const deliverySubmit = (values) => {
    setDeliveryAddress(values)
    setEditDeliveryAddress(false)
  }

  const billingSubmit = (values) => {
    setBillingAddress(values)
    setEditBillingAddress(false)
  }

  const formik = useFormik({
    initialValues: {
      zipCode: "",
    },
    validationSchema: yup.object({
      zipCode: yup
        .string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(5, "Must be 5 digits")
        .max(5, "Must be 5 digits")
        .required("Postal code is required"),
    }),
    onSubmit: (values) => {
      fetchDeliveryPoints(values)
    },
  })

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 4,
        display: "flex",
        gap: "20px",
      }}
    >
      <ContentCard
        disableHover
        size={{ width: "50%", height: "100%" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Delivery Address
        </Typography>
        <Tabs
          variant="fullWidth"
          value={deliveryMethod}
          onChange={(event, newValue) => setDeliveryMethod(newValue)}
          sx={{ flexBasis: "100%", margin: 1 }}
        >
          <Tab value="pickup" label="Pickup Point" />
          <Tab value="home" label="Home Delivery" />
        </Tabs>

        {deliveryMethod === "pickup" && (
          <>
            <form
              onSubmit={formik.handleSubmit}
              style={{ margin: 8 }}
            >
              <Box sx={{ display: "flex", gap: "15px" }}>
                <FormikField
                  formik={formik}
                  field="zipCode"
                  label="Zip Code"
                  sx={{ width: "70%" }}
                />
                <Button type="submit" sx={{ width: "30%" }}>
                  Search
                </Button>
              </Box>
            </form>
            {deliveryPoints &&
              deliveryPoints.locations.map((p) => (
                <PostAddress key={p.id} point={p} />
              ))}
          </>
        )}
        {deliveryMethod === "home" && (
          <>
            {editDeliveryAddress && (
              <AddressForm
                submit={deliverySubmit}
                address={deliveryAddress}
                sx={{ margin: 2 }}
              />
            )}
            {!editDeliveryAddress && (
              <AddressDisplay
                address={deliveryAddress}
                enterEdit={() => setEditDeliveryAddress(true)}
              />
            )}
          </>
        )}
      </ContentCard>

      <ContentCard
        disableHover
        size={{
          width: "50%",
          height: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Billing Address
        </Typography>
        <FormGroup sx={{ margin: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={deliveryMethod === "pickup"}
                checked={useDeliveryAsBilling}
                onChange={(e) =>
                  setUseDeliveryAsBilling(e.target.checked)
                }
              />
            }
            label="Use delivery address as billing address"
          />
        </FormGroup>

        {requireExplicitBillingAddress && editBillingAddress && (
          <AddressForm
            submit={billingSubmit}
            address={billingAddress}
            sx={{ margin: 2 }}
          />
        )}
        {requireExplicitBillingAddress && !editBillingAddress && (
          <AddressDisplay
            address={billingAddress}
            enterEdit={() => setEditBillingAddress(true)}
          />
        )}
      </ContentCard>
    </Container>
  )
}

export default Address
