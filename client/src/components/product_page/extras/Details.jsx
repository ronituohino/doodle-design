import { Typography } from "@mui/material"

const Details = ({ tab, index }) => {
  return <>{tab === index && <Typography>Details..</Typography>}</>
}

export default Details
