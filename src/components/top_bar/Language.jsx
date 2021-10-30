import { useState } from "react"
import { IconButton, Menu, MenuItem } from "@mui/material"

import LanguageIcon from "@mui/icons-material/Language"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

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
      <IconButton color="inherit" sx={{ margin: 0.5 }} onClick={openMenu}>
        <LanguageIcon />
        <ArrowDropDownIcon sx={{ position: "absolute", top: 26 }} />
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
