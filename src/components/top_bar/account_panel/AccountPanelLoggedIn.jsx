import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Icon,
} from "@mui/material"

import { useRouting } from "../../../hooks/useRouting"
import { useAccount } from "../../../hooks/useAccount"

const AccountPanelLoggedIn = ({ closeMenu }) => {
  const { openLink, adminLink } = useRouting()
  const { logOut, data } = useAccount()

  return (
    <>
      <ListItem>
        <ListItemText primary={`Logged in: ${data.me.username}`} />
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            logOut()
            closeMenu()
          }}
        >
          <ListItemIcon>
            <Icon>logout</Icon>
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
                openLink(adminLink())
                closeMenu()
              }}
            >
              <ListItemIcon>
                <Icon>admin_panel_settings</Icon>
              </ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </>
  )
}

export default AccountPanelLoggedIn
