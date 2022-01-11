import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material"

import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import { useRouting } from "../../../hooks/useRouting"

const AccountPanelNotLoggedIn = ({ closeMenu }) => {
  const { openLink, loginLink, registerLink } = useRouting()

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            closeMenu()
            openLink(loginLink())
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
            openLink(registerLink())
          }}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default AccountPanelNotLoggedIn
