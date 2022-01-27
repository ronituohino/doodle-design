import { useState } from "react"
import {
  Drawer,
  IconButton,
  Box,
  ClickAwayListener,
  Icon,
  ListSubheader,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../../graphql/queries"

import Category from "./Category"

const CategoryDrawer = () => {
  const { data } = useQuery(GET_CATEGORIES)
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Icon sx={{ color: "white" }}>menu</Icon>
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
                {data.getCategories.length > 0 ? (
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
                ) : (
                  <ListSubheader>No categories defined</ListSubheader>
                )}
              </>
            )}
          </Box>
        </ClickAwayListener>
      </Drawer>
    </>
  )
}

export default CategoryDrawer
