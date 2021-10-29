import { useState } from "react"

import {
  AppBar,
  Toolbar,
  Badge,
  Container,
  IconButton,
} from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import PersonIcon from "@mui/icons-material/Person"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import CategoryBar from "./CategoryBar"
import SearchBar from "./SearchBar"

import { Link, useHistory } from "react-router-dom"
import { useSpring } from "react-spring"

import logo from "../../images/logo.png"

const TopBar = () => {
  const history = useHistory()

  const [searchDisabled, setSearchDisabled] = useState(true)
  const [searchProps, searchApi] = useSpring(() => ({
    backgroundColor: "rgba(255,255,255,0)",
  }))

  const openSearchBar = () => {
    setSearchDisabled(false)
    searchApi.start({ backgroundColor: "rgba(255,255,255,255)" })
  }

  const closeSearchBar = () => {
    setSearchDisabled(true)
    searchApi.start({ backgroundColor: "rgba(255,255,255,0)" })
  }

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

            <IconButton
              color="inherit"
              sx={{ margin: "4px" }}
              onClick={openSearchBar}
            >
              <SearchIcon />
            </IconButton>

            <SearchBar
              searchProps={searchProps}
              searchDisabled={searchDisabled}
              closeSearchBar={closeSearchBar}
            />

            <div style={{ flexGrow: 1 }}></div>

            <CategoryBar searchDisabled={searchDisabled} />

            <IconButton color="inherit" sx={{ margin: "4px" }}>
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

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
