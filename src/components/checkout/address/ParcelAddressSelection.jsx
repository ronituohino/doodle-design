import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import { getPostalPoints } from "../../../axios/requests"

import ParcelAddress from "./ParcelAddress"

const ParcelAddressSelection = () => {
  const [deliveryPoints, setDeliveryPoints] = useState(undefined)
  const [zipCode, setZipCode] = useState("")

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

  return (
    <Box sx={{ width: "500px" }}>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <TextField
          label="Zip Code"
          sx={{ width: "25%" }}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <Button
          onClick={fetchDeliveryPoints}
          sx={{ width: "15%" }}
          variant="contained"
        >
          Search
        </Button>
      </Box>

      {deliveryPoints &&
        deliveryPoints.locations &&
        deliveryPoints.locations.map(
          (p) =>
            appropriatePoint(p) && (
              <ParcelAddress key={p.id} point={p} />
            )
        )}
      {deliveryPoints && !deliveryPoints.locations && (
        <Typography sx={{ margin: 1 }}>
          No Posti points found!
        </Typography>
      )}
    </Box>
  )
}

export default ParcelAddressSelection
