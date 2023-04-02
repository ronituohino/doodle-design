import { Outlet } from "react-router-dom";
import AdminDrawer from "./AdminDrawer";
import Login from "./Login";
import { Box, Divider } from "@mui/material";

const Layout = ({ isAdmin }) => {
  return (
    <>
      {!isAdmin && <Login />}
      {isAdmin && (
        <Box sx={{ display: "flex" }}>
          <AdminDrawer />
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              backgroundColor: "common.white",
              width: "100%",
              height: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Layout;
