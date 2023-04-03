import { Box, Divider } from "@mui/material";

import AccountDrawer from "./AccountDrawer";

import { Outlet, Navigate } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";
import { useRouting } from "../../hooks/useRouting";

const Account = () => {
  const { loggedIn } = useAccount();
  const { homeLink } = useRouting();
  const isLoggedIn = loggedIn();

  return (
    <>
      {isLoggedIn && (
        <Box sx={{ display: "flex" }}>
          <Box>
            <AccountDrawer />
          </Box>

          <Divider orientation="vertical" flexItem />

          <Outlet />
        </Box>
      )}
      {!isLoggedIn && <Navigate to={homeLink()} />}
    </>
  );
};

export default Account;
