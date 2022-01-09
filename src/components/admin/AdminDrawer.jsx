import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material"

import { useRouting } from "../../hooks/useRouting"

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"

const AdminDrawer = () => {
  const { openHome } = useRouting()

  return (
    <>
      <Drawer anchor="left" variant="permanent">
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              openHome()
            }}
          >
            <ListItemIcon>
              <KeyboardReturnIcon />
            </ListItemIcon>
            <ListItemText primary="Return" />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  )
}

export default AdminDrawer
