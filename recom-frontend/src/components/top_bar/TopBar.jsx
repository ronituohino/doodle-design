import { AppBar, Box, Toolbar, Container } from "@mui/material"

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
    <AppBar position="fixed" color="primary">
      <Toolbar disableGutters>
        <Container sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <CategoryDrawer />

            <Link to={homeLink()} sx={{ alignSelf: "center" }}>
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
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <SearchBar
              placeholder="Search..."
              sx={{
                width: "75%",
                backgroundColor: "common.white",
                borderRadius: 1,
                alignSelf: "center",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "5px" }}>
            <ShoppingCart />
            <AccountPanel />
            <Language />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
