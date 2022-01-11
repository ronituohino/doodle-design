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
    <AppBar color="primary">
      <Toolbar>
        <CategoryDrawer />
        <Container
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "center" }}
        >
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

          <Box sx={{ alignSelf: "center" }}>
            <SearchBar
              placeholder="Search..."
              sx={{
                backgroundColor: "background.default",
                margin: "auto",
              }}
            />
          </Box>
        </Container>

        <ShoppingCart />
        <AccountPanel />
        <Language />
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
