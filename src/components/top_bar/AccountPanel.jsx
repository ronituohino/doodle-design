import { useState } from "react"
import {
  IconButton,
  Menu,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import PersonIcon from "@mui/icons-material/Person"
import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import ShieldIcon from "@mui/icons-material/Shield"

const AccountPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { openLogin, openRegister, openAdmin } = useRouting()
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
        <List>
          {data && data.me && (
            <>
              <ListItem>
                <ListItemText
                  primary={`Logged in: ${data.me.username}`}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    logOut()
                    closeMenu()
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>

              {(data.me.accountType === "Admin" ||
                data.me.accountType === "Support") && (
                <>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        logOut()
                        openAdmin()
                      }}
                    >
                      <ListItemIcon>
                        <ShieldIcon />
                      </ListItemIcon>
                      <ListItemText primary="Admin Panel" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </>
          )}

          {!data ||
            (!data.me && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      closeMenu()
                      openLogin()
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      closeMenu()
                      openRegister()
                    }}
                  >
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            ))}
        </List>
      </Menu>
    </>
  )
}

export default AccountPanel
