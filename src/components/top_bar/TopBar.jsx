import { AppBar, Box, Container, Toolbar } from "@mui/material"

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
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <AppBar
        position="static"
        color="primary"
        enableColorOnDark
        sx={{ borderRadius: 1 }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Box sx={{ width: "33%" }}>
            <CategoryDrawer />
          </Box>

          <Box sx={{ mr: 2, alignSelf: "center" }}>
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

          <Box sx={{ width: "100%", alignSelf: "center" }}>
            <SearchBar
              placeholder="Search..."
              sx={{
                backgroundColor: "primary.dark",
              }}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexBasis: "100%" }} />
            <ShoppingCart />
            <AccountPanel />
            <Language />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default TopBar
