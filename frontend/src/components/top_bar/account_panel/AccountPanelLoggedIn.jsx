import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListSubheader,
} from "@mui/material"

import { useRouting } from "../../../hooks/useRouting"
import { useAccount } from "../../../hooks/useAccount"

const AccountPanelLoggedIn = ({ closeMenu }) => {
  const { openLink, adminLink, accountLink } = useRouting()
  const { logOut, data } = useAccount()

  return (
    <>
      <ListSubheader>
        {`Logged in: ${data.me.username}`}
      </ListSubheader>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            openLink(accountLink())
            closeMenu()
          }}
        >
          <ListItemIcon>
            <Icon>manage_accounts</Icon>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>

      {(data.me.accountType === "Admin" ||
        data.me.accountType === "Support") && (
        <>
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
    </>
  )
}

export default AccountPanelLoggedIn
