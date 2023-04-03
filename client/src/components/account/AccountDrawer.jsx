import {
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Icon,
} from "@mui/material";

import { useAccount } from "../../hooks/useAccount";
import { useLanguage } from "../../hooks/useLanguage";
import { useRouting } from "../../hooks/useRouting";
import { getText } from "../../utils/dictionary";

const AccountDrawer = () => {
  const { language } = useLanguage();
  const { data } = useAccount();
  const { openLink, accountLink, accountSettingsLink, accountOrdersLink } =
    useRouting();

  return (
    <>
      <List sx={{ backgroundColor: "common.white" }}>
        {data && data.me && (
          <ListSubheader>
            {`${getText(language, "loggedIn")}: ${data.me.username}`}
          </ListSubheader>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={() => openLink(accountLink())}>
            <ListItemIcon>
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary={getText(language, "overview")} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => openLink(accountSettingsLink())}>
            <ListItemIcon>
              <Icon>manage_accounts</Icon>
            </ListItemIcon>
            <ListItemText primary={getText(language, "settings")} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => openLink(accountOrdersLink())}>
            <ListItemIcon>
              <Icon>local_shipping</Icon>
            </ListItemIcon>
            <ListItemText primary={getText(language, "orders")} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default AccountDrawer;
