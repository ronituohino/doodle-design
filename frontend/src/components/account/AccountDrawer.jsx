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

const AccountDrawer = ({ set, SETTINGS, ORDERS }) => {
  const { data } = useAccount()

  return (
    <>
      <List sx={{ backgroundColor: "common.white" }}>
        {data && data.me && (
          <ListSubheader>
            {`Logged in: ${data.me.username}`}
          </ListSubheader>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={() => set(SETTINGS)}>
            <ListItemIcon>
              <Icon>manage_accounts</Icon>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => set(ORDERS)}>
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
