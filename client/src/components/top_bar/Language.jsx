import { useState } from "react"
import { Box, IconButton, Menu, MenuItem, Icon } from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"

const Language = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { setLanguage } = useLanguage()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ alignSelf: "center" }}>
        <IconButton color="inherit" onClick={openMenu}>
          <Icon>language</Icon>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={() => {
            closeMenu()
            setLanguage("fi")
          }}
        >
          FI
        </MenuItem>

        <MenuItem
          onClick={() => {
            closeMenu()
            setLanguage("en")
          }}
        >
          EN
        </MenuItem>
      </Menu>
    </>
  )
}

export default Language
