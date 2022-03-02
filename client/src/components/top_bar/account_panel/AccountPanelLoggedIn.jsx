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
import { useLanguage } from "../../../hooks/useLanguage"
import { getText } from "../../../utils/dictionary"

const AccountPanelLoggedIn = ({ closeMenu }) => {
  const { language } = useLanguage()
  const { openLink, accountLink } = useRouting()
  const { logOut, data } = useAccount()

  return (
    <>
      <ListSubheader>
        {`${getText(language, "loggedIn")}: ${data.me.username}`}
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
          <ListItemText
            primary={`${getText(language, "settings")}`}
          />
        </ListItemButton>
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
          <ListItemText primary={`${getText(language, "logout")}`} />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default AccountPanelLoggedIn
