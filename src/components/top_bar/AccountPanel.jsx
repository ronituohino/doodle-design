import { useState } from "react"
import {
  IconButton,
  Menu,
  Button,
  Box,
  Typography,
} from "@mui/material"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import PersonIcon from "@mui/icons-material/Person"
import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

const AccountPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { openLogin, openRegister } = useRouting()
  const { logOut, data } = useAccount()

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
          {data && data.me ? (
            <>
              <Typography>Logged in: {data.me.username}</Typography>
              <Button
                onClick={() => {
                  closeMenu()
                  logOut()
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  closeMenu()
                  openLogin()
                }}
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  closeMenu()
                  openRegister()
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Menu>
    </>
  )
}

export default AccountPanel
