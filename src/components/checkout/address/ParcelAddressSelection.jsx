import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import { getPostalPoints } from "../../../axios/requests"

import ParcelAddress from "./ParcelAddress"

const ParcelAddressSelection = ({ setAddress }) => {
  const [deliveryPoints, setDeliveryPoints] = useState(undefined)
  const [zipCode, setZipCode] = useState("")

  const foundDeliveryPoints =
    deliveryPoints && deliveryPoints.locations
  const notFoundDeliveryPoints =
    deliveryPoints && !deliveryPoints.locations

  const fetchDeliveryPoints = async () => {
    const response = await getPostalPoints(zipCode, 5)
    setDeliveryPoints(response)
  }

  const appropriatePoint = (point) => {
    if (
      (point.type === "SMARTPOST" ||
        point.type === "POSTOFFICE" ||
        point.type === "LOCKER" ||
        point.type === "POBOX") &&
      point.labelName &&
      point.routingServiceCode
    ) {
      return true
    }
    return false
  }

  // Transform point fields to
  // parent form fields
  const transform = (point) => {
    setAddress({
      address: point.address.fi.address,
      city: point.address.fi.municipality,
      zipCode: point.address.fi.postalCode,
      extra: point.labelName.fi,
    })
  }

  return (
    <Box sx={{ width: "500px" }}>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <TextField
          label="Zip Code"
          sx={{ width: "25%" }}
          onChange={(e) => setZipCode(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          onClick={fetchDeliveryPoints}
          sx={{ width: "15%" }}
          variant="contained"
        >
          Search
        </Button>
      </Box>

      {foundDeliveryPoints &&
        deliveryPoints.locations.map(
          (p) =>
            appropriatePoint(p) && (
              <ParcelAddress
                key={p.id}
                point={p}
                selectCallback={transform}
              />
            )
        )}
      {notFoundDeliveryPoints && (
        <Typography sx={{ margin: 1 }}>
          No Posti points found!
        </Typography>
      )}
    </Box>
  )
}

export default ParcelAddressSelection
