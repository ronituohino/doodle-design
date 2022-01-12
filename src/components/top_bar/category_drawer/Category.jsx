import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { useRouting } from "../../../hooks/useRouting"

import Icon from "../../general/Icon"

const Category = ({ closeMenu, category, label, icon }) => {
  const { openLink, categoryLink } = useRouting()

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          openLink(categoryLink(category))
          closeMenu()
        }}
      >
        <ListItemIcon>
          <Icon name={icon} />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}

export default Category
