import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Icon,
} from "@mui/material";
import { useLanguage } from "../../../hooks/useLanguage";
import { getText } from "../../../utils/dictionary";

import { useRouting } from "../../../hooks/useRouting";

const AccountPanelNotLoggedIn = ({ closeMenu }) => {
  const { language } = useLanguage();
  const { openLink, loginLink, registerLink } = useRouting();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            closeMenu();
            openLink(loginLink());
          }}
        >
          <ListItemIcon>
            <Icon>login</Icon>
          </ListItemIcon>
          <ListItemText primary={`${getText(language, "login")}`} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            closeMenu();
            openLink(registerLink());
          }}
        >
          <ListItemIcon>
            <Icon>person_add</Icon>
          </ListItemIcon>
          <ListItemText primary={`${getText(language, "register")}`} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default AccountPanelNotLoggedIn;
