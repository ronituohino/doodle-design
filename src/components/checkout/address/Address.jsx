import { useState } from "react"
import { Container, Tabs, Tab } from "@mui/material"
import ContentCard from "../../content/ContentCard"
import AddressForm from "./AddressForm"
import AddressDisplay from "./AddressDisplay"

const Address = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")

  const [editDeliveryAddress, setEditDeliveryAddress] = useState(true)
  const [deliveryAddress, setDeliveryAddress] = useState(undefined)

  const [editBillingAddress, setEditBillingAddress] = useState(true)
  const [billingAddress, setBillingAddress] = useState(undefined)

  const handleChange = (event, newValue) => {
    setDeliveryMethod(newValue)
  }

  const deliverySubmit = (values) => {
    setDeliveryAddress(values)
    setEditDeliveryAddress(false)
  }

  const billingSubmit = (values) => {
    setBillingAddress(values)
    setEditBillingAddress(false)
  }

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
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <Tabs
          value={deliveryMethod}
          onChange={handleChange}
          sx={{ flexBasis: "100%" }}
        >
          <Tab value="pickup" label="Pickup Point" />
          <Tab value="home" label="Home Delivery" />
        </Tabs>

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
      </ContentCard>

      <ContentCard
        disableHover
        size={{ width: "50%", height: "100%" }}
      >
        <AddressForm submit={billingSubmit} sx={{ margin: 2 }} />
      </ContentCard>
    </Container>
  )
}

export default Address
