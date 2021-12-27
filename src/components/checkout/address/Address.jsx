import { useState } from "react"
import { Container, Tabs, Tab } from "@mui/material"
import ContentCard from "../../content/ContentCard"
import AddressForm from "./AddressForm"

const Address = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")

  const handleChange = (event, newValue) => {
    setDeliveryMethod(newValue)
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

        <AddressForm sx={{ margin: 2 }} />
      </ContentCard>

      <ContentCard
        disableHover
        size={{ width: "50%", height: "100%" }}
      >
        <Tabs
          value={deliveryMethod}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="pickup" label="Pickup Point" />
          <Tab value="home" label="Home Delivery" />
        </Tabs>
      </ContentCard>
    </Container>
  )
}

export default Address
