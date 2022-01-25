import { useState } from "react"

import { Box, Divider } from "@mui/material"

import AccountDrawer from "./AccountDrawer"
import AccountSettings from "./AccountSettings"

const SETTINGS = "settings"
const ORDERS = "orders"

const Account = () => {
  const [viewedSection, setViewedSection] = useState(SETTINGS)

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <AccountDrawer
          set={setViewedSection}
          SETTINGS={SETTINGS}
          ORDERS={ORDERS}
        />
      </Box>

      <Divider orientation="vertical" flexItem />

      {viewedSection === SETTINGS && <AccountSettings />}

      {viewedSection === ORDERS && <p>orders</p>}
    </Box>
  )
}

export default Account
