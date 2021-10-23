import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  Container,
  Button,
  IconButton,
} from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import PersonIcon from "@mui/icons-material/Person"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { Link } from "react-router-dom"

import logo from "./images/logo.png"

const TopBar = () => {
  return (
    <>
      <Box margin="-8px">
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 80,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  margin: "4px",
                }}
                src={logo}
              />

              <IconButton color="inherit" sx={{ margin: "4px" }}>
                <SearchIcon />
              </IconButton>

              <CategoryBar />

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
      </Box>
    </>
  )
}

const CategoryBar = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Category name="apples" />
        <Category name="pears" />
      </Box>
    </>
  )
}

const Category = ({ name }) => {
  console.log(name)

  return (
    <>
      <Link to={`/product/${name}`}>
        <Button variant="text" sx={{ margin: "4px", color: "white" }}>
          {name}
        </Button>
      </Link>
    </>
  )
}

export default TopBar
