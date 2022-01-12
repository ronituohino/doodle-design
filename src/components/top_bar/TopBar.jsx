import { AppBar, Box, Toolbar } from "@mui/material"

import SearchBar from "./SearchBar"

import { Link } from "react-router-dom"

import logo from "../../images/logo.png"
import ShoppingCart from "./shopping_cart/ShoppingCart"
import AccountPanel from "./account_panel/AccountPanel"
import Language from "./Language"
import { useRouting } from "../../hooks/useRouting"
import CategoryDrawer from "./category_drawer/CategoryDrawer"

const TopBar = () => {
  const { homeLink } = useRouting()

  return (
    <AppBar
      position="static"
      color="primary"
      enableColorOnDark
      sx={{}}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <CategoryDrawer />

          <Link to={homeLink()}>
            <img
              style={{
                height: 40,
                width: 80,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                margin: 4,
              }}
              src={logo}
            />
          </Link>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchBar
            placeholder="Search..."
            sx={{
              backgroundColor: "primary.dark",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: "5px" }}>
          <Box sx={{ flexBasis: "100%" }} />
          <ShoppingCart />
          <AccountPanel />
          <Language />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
