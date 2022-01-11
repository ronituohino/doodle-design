import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material"

import LogoutIcon from "@mui/icons-material/Logout"
import ShieldIcon from "@mui/icons-material/Shield"

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
                openLink(adminLink())
                closeMenu()
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
  )
}

export default AccountPanelLoggedIn
