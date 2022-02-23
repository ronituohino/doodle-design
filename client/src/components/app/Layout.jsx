import { Container } from "@mui/material"

import TopBar from "../top_bar/TopBar"
import Footer from "../footer/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <TopBar />
      <Container sx={{ mt: 12 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
