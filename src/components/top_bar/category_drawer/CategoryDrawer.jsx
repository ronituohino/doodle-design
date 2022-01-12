import { useState } from "react"
import {
  Drawer,
  IconButton,
  Box,
  ClickAwayListener,
} from "@mui/material"

import Category from "./Category"

import Icon from "../../general/Icon"

const CategoryDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Icon name="MenuIcon" />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen}>
        <ClickAwayListener onClickAway={() => setDrawerOpen(false)}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Category
              cateogry="clothing"
              label="Clothing"
              icon="FastfoodIcon"
            />
          </Box>
        </ClickAwayListener>
      </Drawer>
    </>
  )
}

export default CategoryDrawer
