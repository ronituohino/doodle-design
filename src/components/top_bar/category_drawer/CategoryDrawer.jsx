import { useState } from "react"
import {
  Drawer,
  IconButton,
  Box,
  ClickAwayListener,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../../graphql/queries"

import Category from "./Category"

import Icon from "../../general/Icon"

const CategoryDrawer = () => {
  const { data } = useQuery(GET_CATEGORIES)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Icon sx={{ color: "white" }} name="MenuIcon" />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen}>
        <ClickAwayListener onClickAway={() => setDrawerOpen(false)}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            {data && data.getCategories && (
              <>
                {data.getCategories.map((category) => {
                  return (
                    <Category
                      closeMenu={() => setDrawerOpen(false)}
                      key={category._id}
                      category={category.name}
                      label={category.label}
                      icon={category.icon}
                    />
                  )
                })}
              </>
            )}
          </Box>
        </ClickAwayListener>
      </Drawer>
    </>
  )
}

export default CategoryDrawer
