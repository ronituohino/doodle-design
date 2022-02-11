import { Outlet } from "react-router-dom"
import AdminDrawer from "./AdminDrawer"
import Login from "./Login"
import { Box, Divider } from "@mui/material"

const Layout = ({ isAdmin }) => {
  return (
    <>
      {!isAdmin && <Login />}
      {isAdmin && (
        <Box sx={{ display: "flex" }}>
          <AdminDrawer />
          <Divider orientation="vertical" flexItem />
          <Outlet />
        </Box>
      )}
    </>
  )
}

export default Layout
