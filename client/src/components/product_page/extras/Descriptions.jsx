import { Typography } from "@mui/material"

const Description = ({ tab, index }) => {
  return <>{tab === index && <Typography>Desc</Typography>}</>
}

export default Description
