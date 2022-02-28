import { Paper, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import Ratings from "./Ratings"

// Details, ratings, etc
// eslint-disable-next-line
const Extras = ({ product }) => {
  const [tab, setTab] = useState(0)

  return (
    <Paper elecation={4}>
      <Tabs
        selectionFollowsFocus
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
      >
        <Tab label="Ratings" disabled />
      </Tabs>

      <Ratings tab={tab} index={0} />
    </Paper>
  )
}

export default Extras
