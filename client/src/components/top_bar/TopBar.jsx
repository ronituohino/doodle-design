import { AppBar, Box, Toolbar, Container } from "@mui/material"

import SearchBar from "./search_bar/SearchBar"

import { Link } from "react-router-dom"

import logo from "../../images/logo.png"
import ShoppingCart from "./shopping_cart/ShoppingCart"
import AccountPanel from "./account_panel/AccountPanel"
import Language from "./Language"
import { useRouting } from "../../hooks/useRouting"
import CategoryDrawer from "./category_drawer/CategoryDrawer"
import { getText } from "../../utils/dictionary"
import { useLanguage } from "../../hooks/useLanguage"

const TopBar = () => {
  const { language } = useLanguage()
  const { homeLink } = useRouting()

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar disableGutters>
        <Container sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              width: "20%",
            }}
          >
            <CategoryDrawer />

            <Link to={homeLink()}>
              <img
                alt="shop logo, link to home page"
                style={{
                  height: 40,
                  width: 80,
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
              placeholder={getText(language, "search")}
              sx={{
                width: "80%",
                backgroundColor: "common.white",
                borderRadius: 1,
                alignSelf: "center",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "5px", width: "20%" }}>
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
