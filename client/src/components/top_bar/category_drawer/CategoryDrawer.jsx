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
import { useLanguage } from "../../../hooks/useLanguage"
import { getText } from "../../../utils/dictionary"

const CategoryDrawer = () => {
  const { language } = useLanguage()
  const { data } = useQuery(GET_CATEGORIES)
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <Box sx={{ alignSelf: "center" }}>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <Icon sx={{ color: "white" }}>menu</Icon>
        </IconButton>
      </Box>

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
                          category={category}
                          language={language}
                        />
                      )
                    })}
                  </>
                ) : (
                  <ListSubheader>
                    {getText(language, "noCategoriesDefined")}
                  </ListSubheader>
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
