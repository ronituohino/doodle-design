import { Paper, Typography, Box } from "@mui/material"

const Home = () => {
  return (
    <Box>
      <Paper>
        <Typography>Helo</Typography>
      </Paper>
      <Box sx={{ mt: 4, display: "flex", gap: "20px" }}>
        <Paper>
          <Typography>Sneakers display</Typography>
        </Paper>
        <Paper>
          <Typography>Socks display</Typography>
        </Paper>
      </Box>
    </Box>
  )
}

export default Home
