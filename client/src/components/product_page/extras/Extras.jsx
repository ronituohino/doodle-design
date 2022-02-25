import { Typography, Paper, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import Details from "./Details"

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
        <Tab label="Details" />
        <Tab label="Ratings" disabled />
      </Tabs>

      <Details tab={tab} index={0} />
    </Paper>
  )
}

export default Extras
