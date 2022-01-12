import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material"

import Icon from "../../general/Icon"

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
            <Icon name="LoginIcon" />
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
            <Icon name="PersonAddIcon" />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default AccountPanelNotLoggedIn
