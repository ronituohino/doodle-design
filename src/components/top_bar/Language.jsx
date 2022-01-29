import { useState } from "react"
import { IconButton, Menu, MenuItem, Icon } from "@mui/material"

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
      <IconButton color="inherit" onClick={openMenu}>
        <Icon>language</Icon>
      </IconButton>

      <Menu
        sx={{ marginTop: 2 }}
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
