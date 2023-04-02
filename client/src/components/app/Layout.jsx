import { Container } from "@mui/material";

import TopBar from "../top_bar/TopBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <TopBar />
      <Container sx={{ mt: 12 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
