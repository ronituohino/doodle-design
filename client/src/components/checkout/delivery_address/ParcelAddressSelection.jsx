import { Box, Button, Typography, Paper } from "@mui/material"
import { useState } from "react"
import { getPostalPoints } from "../../../utils/requests"

import ParcelAddress from "./ParcelAddress"
import FormikField from "../../general/formik/FormikField"

const ParcelAddressSelection = ({ formik, setAddress }) => {
  const [deliveryPoints, setDeliveryPoints] = useState(undefined)

  const foundDeliveryPoints =
    deliveryPoints && deliveryPoints.locations
  const notFoundDeliveryPoints =
    deliveryPoints && !deliveryPoints.locations

  const fetchDeliveryPoints = async () => {
    const response = await getPostalPoints(
      formik.values.searchZipCode,
      5
    )
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
      country: "FI",
    })
  }

  return (
    <Paper variant="outlined" sx={{ padding: 2, marginRight: 6 }}>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          padding: 2,
        }}
      >
        <FormikField
          formik={formik}
          label="Zip Code"
          field="searchZipCode"
          sx={{ width: "30%" }}
        />
        <Button onClick={fetchDeliveryPoints} variant="contained">
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
    </Paper>
  )
}

export default ParcelAddressSelection
