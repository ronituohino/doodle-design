import { useState } from "react"
import { IconButton, Menu, Button, Box } from "@mui/material"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import PersonIcon from "@mui/icons-material/Person"
import { useHistory } from "react-router-dom"
import { useLanguage } from "../../hooks/useLanguage"

const AccountPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const history = useHistory()
  const { language } = useLanguage()

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
        <PersonIcon />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 0.5,
          }}
        >
          <Button
            onClick={() => history.push(`/${language}/account/login`)}
          >
            Log In
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 0.5,
          }}
        >
          <Button
            onClick={() =>
              history.push(`/${language}/account/register`)
            }
          >
            Register
          </Button>
        </Box>
      </Menu>
    </>
  )
}

export default AccountPanel
