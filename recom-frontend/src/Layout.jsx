import { Container } from "@mui/material"

import TopBar from "./components/top_bar/TopBar"
import Footer from "./components/footer/Footer"
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
