import { useState } from "react"

import {
  AppBar,
  Toolbar,
  Badge,
  Container,
  Button,
  IconButton,
  ClickAwayListener,
} from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import PersonIcon from "@mui/icons-material/Person"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { Link, useHistory } from "react-router-dom"

import { useSpring, animated } from "react-spring"

import logo from "./images/logo.png"

const TopBar = () => {
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
      <div style={{ margin: "-8px" }}>
        <AppBar position="static">
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

              <IconButton color="inherit" sx={{ margin: "4px" }}>
                <PersonIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  )
}

const SearchBar = ({ searchProps, closeSearchBar }) => {
  const [searchWord, setSearchWord] = useState("")

  return (
    <>
      <ClickAwayListener
        mouseEvent="onMouseUp"
        onClickAway={() => {
          closeSearchBar()
          setSearchWord("")
        }}
      >
        <div style={{}}>
          <animated.input
            style={{
              ...searchProps,
              borderStyle: "hidden",

              width: "60%",
              height: "50%",
              position: "absolute",

              left: "20%",
              right: "20%",
              top: "25%",

              borderRadius: 16,
              justifyContent: "center",
              alignContent: "center",
            }}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
      </ClickAwayListener>
    </>
  )
}

const CategoryBar = ({ searchDisabled }) => {
  return (
    <>
      <div
        style={{
          left: "20%",
          right: "20%",
          marginLeft: 0,
          marginRight: "auto",

          position: "absolute",
          display: "flex",

          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {searchDisabled ? (
          <>
            <Category name="apples" />
            <Category name="pears" />
            <Category name="bananas" />
            <Category name="watermelons" />
            <Category name="kiwis" />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

const Category = ({ name }) => {
  const history = useHistory()
  const press = () => {
    history.push(`/product/${name}`)
  }

  return (
    <>
      <Button
        variant="text"
        sx={{ margin: "4px", color: "white" }}
        onClick={press}
      >
        {name}
      </Button>
    </>
  )
}

export default TopBar
