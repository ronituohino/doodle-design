import {
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Icon,
} from "@mui/material"

import { useAccount } from "../../hooks/useAccount"
import { useRouting } from "../../hooks/useRouting"

const AccountDrawer = () => {
  const { data } = useAccount()
  const {
    openLink,
    accountLink,
    accountSettingsLink,
    accountOrdersLink,
  } = useRouting()

  return (
    <>
      <List sx={{ backgroundColor: "common.white" }}>
        {data && data.me && (
          <ListSubheader>
            {`Logged in: ${data.me.username}`}
          </ListSubheader>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={() => openLink(accountLink())}>
            <ListItemIcon>
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => openLink(accountSettingsLink())}
          >
            <ListItemIcon>
              <Icon>manage_accounts</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => openLink(accountOrdersLink())}
          >
            <ListItemIcon>
              <Icon>local_shipping</Icon>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}

export default AccountDrawer
