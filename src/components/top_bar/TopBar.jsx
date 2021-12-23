import { useState } from "react"

import { AppBar, Toolbar, Container, Box } from "@mui/material"

import CategoryBar from "./CategoryBar"
import SearchBar from "./SearchBar"

import { Link } from "react-router-dom"

import logo from "../../images/logo.png"
import ShoppingCart from "./shopping_cart/ShoppingCart"
import AccountPanel from "./AccountPanel"
import Language from "./Language"

const TopBar = () => {
  const [searchDisabled, setSearchDisabled] = useState(true)

  return (
    <>
      <Container>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            <Link to="/">
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

            <SearchBar setSearchDisabled={setSearchDisabled} />

            <Box sx={{ flexGrow: 1 }} />

            <CategoryBar searchDisabled={searchDisabled} />

            <ShoppingCart />

            <AccountPanel />

            <Language />
          </Toolbar>
        </AppBar>
      </Container>
    </>
  )
}

export default TopBar
