import { Typography, Paper, Tabs, Tab } from "@mui/material"
import { useState } from "react"
import Description from "./Descriptions"

// Description, ratings, etc
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
        <Tab label="Description" />
        <Tab label="Ratings" disabled />
      </Tabs>

      <Description tab={tab} index={0} />
    </Paper>
  )
}

export default Extras
