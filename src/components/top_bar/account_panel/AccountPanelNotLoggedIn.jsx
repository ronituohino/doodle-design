import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Icon,
} from "@mui/material"

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
            <Icon>login</Icon>
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
            <Icon>person_add</Icon>
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default AccountPanelNotLoggedIn
