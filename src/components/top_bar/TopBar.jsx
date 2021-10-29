import { useState } from "react"

import { AppBar, Toolbar, Container, IconButton } from "@mui/material"

import PersonIcon from "@mui/icons-material/Person"

import CategoryBar from "./CategoryBar"
import SearchBar from "./SearchBar"

import { Link, useHistory } from "react-router-dom"

import logo from "../../images/logo.png"
import ShoppingCart from "./ShoppingCart"

const TopBar = () => {
  const history = useHistory()
  const [searchDisabled, setSearchDisabled] = useState(true)

  return (
    <>
      <AppBar position="static" sx={{ margin: "-8px" }}>
        <Container>
          <Toolbar>
            <Link to="/">
              <img
                style={{
                  height: 40,
                  width: 80,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  margin: "4px",
                }}
                src={logo}
              />
            </Link>

            <SearchBar setSearchDisabled={setSearchDisabled} />

            <div style={{ flexGrow: 1 }}></div>

            <CategoryBar searchDisabled={searchDisabled} />

            <ShoppingCart />

            <IconButton
              color="inherit"
              sx={{ margin: "4px" }}
              onClick={() => history.push("/account")}
            >
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default TopBar
