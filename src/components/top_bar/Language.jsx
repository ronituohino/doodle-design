import { useState } from "react"
import { IconButton, Menu, MenuItem } from "@mui/material"

import LanguageIcon from "@mui/icons-material/Language"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

import { useHistory, useLocation } from "react-router"
import { languageVar } from "../../cache"

const Language = () => {
  const history = useHistory()
  const location = useLocation()

  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        color="inherit"
        sx={{ margin: 0.5 }}
        onClick={openMenu}
      >
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
            languageVar("fi")
            closeMenu()
            history.push(`/fi${location.pathname.substring(3)}`)
          }}
        >
          FI
        </MenuItem>

        <MenuItem
          onClick={() => {
            languageVar("en")
            closeMenu()
            history.push(`/en${location.pathname.substring(3)}`)
          }}
        >
          EN
        </MenuItem>
      </Menu>
    </>
  )
}

export default Language
