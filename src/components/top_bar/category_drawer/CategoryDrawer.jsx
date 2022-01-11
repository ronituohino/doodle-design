import { useState } from "react"
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import FastfoodIcon from "@mui/icons-material/Fastfood"

const CategoryDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen}>
        <ClickAwayListener onClickAway={() => setDrawerOpen(false)}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  console.log("hello")
                }}
              >
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
              </ListItemButton>
            </ListItem>
          </Box>
        </ClickAwayListener>
      </Drawer>
    </>
  )
}

export default CategoryDrawer
